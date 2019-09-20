import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';
import { EnvService } from './env.service';
import { XhrService } from './xhr.service';
import { FilterService } from './filter.service';
import { project } from 'models/Project';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ProjectService {

  url: string;
  treated_projects = new BehaviorSubject([]);
  projects = new BehaviorSubject([]);
  latest_projects = new BehaviorSubject([]);
  new_projects = new BehaviorSubject([]);
  all_projects = new BehaviorSubject([]);
  project = new BehaviorSubject({
    id: 0,
  });
  last_n_project = new BehaviorSubject(0);
  user;

  constructor(private global: GlobalService,
    private userService: UserService,
    private xhr: XhrService,
    private http: HttpClient) {
    this.url = EnvService.ip() + '/api/projects';

    // console.log('initializing projects');

    this.userService.user.subscribe(user => {
      if (user['id']) {
        this.user = user;
        this.getLatestProjects();
      }
    });

    this.latest_projects.subscribe(projects => {
      this.new_projects.next(projects.filter(p => {
        return FilterService.newProject(p)
      }))
      this.treated_projects.next(projects.filter(p => {
        return FilterService.treatedProject(p)
      }))
    });

    if (localStorage.getItem('project')) {
      const p = JSON.parse(localStorage.getItem('project'));
      this.project.next(p);
    }

    this.project.subscribe(p => {
      localStorage.setItem('project', JSON.stringify(p))
    })


  }

  getLastNProject(projects) {
    if (projects[0]) {
      this.last_n_project.next(projects[0]['n_project'])
    }
  }

  addProject(p) {
    this.all_projects.next([p, ...this.all_projects.getValue()])
  }


  getLatestProjects() {
    if (this.user.entity_id == undefined) {
      return false
    }

    this.http.get<any>(this.url + '/latest/' + this.user.entity_id)
      .subscribe(projects => {
        projects.sort(GlobalService.sortByDate);
        if (this.projects.getValue() == projects) {
          return
        }
        this.latest_projects.next(projects)
        this.getAllProjects()
      })
  }

  getAllProjects() {
    if (this.user.entity_id == undefined) {
      return false
    }

    this.http.get<any>(this.url + '/all/' + this.user.entity_id)
      .subscribe(projects => {
        // sorting all the projects
        projects.sort(GlobalService.sortByDate);
        if (this.projects.getValue() == projects) {
          return
        }
        this.all_projects.next(projects)
      })
  }


  setProject(project) {
    this.project.next(project)
  }

  setProjectFromId(id) {
    this.http.get<any>(this.url + '/' + id)
      .subscribe(project => {
        this.project.next(project)
      })
  }

  deleteProject(project, next) {

    this.http.delete(this.url + '/' + project.id).subscribe(() => {
      next()
    });
    const p = this.all_projects.getValue();
    p.splice(this.all_projects.getValue().indexOf(project), 1);
    this.all_projects.next(p)

  }

  removeProjectFile(id, next) {
    this.http.delete(EnvService.ip() + '/api/files/' + id).subscribe((result) => {
      console.log(result)
      // next(result.status)
    })
  }

  save(project: any, next) {

    const formData: any = new FormData();

    if (project.be) {
      formData.append('be', JSON.stringify(project.be));

    }

    formData.append('ref', project.ref);
    formData.append('numero', project.numero);
    formData.append('entity_id', project.entity_id);
    formData.append('sender', project.sender);
    formData.append('title', project.title);
    formData.append('content', project.content);
    formData.append('courriel_date', this.global.toOracleDate(project.courriel_date));
    formData.append('received_date', this.global.toOracleDate(project.received_date));
    formData.append('type_id', project.type_id);
    formData.append('letter_id', project.letter_id);
    formData.append('user_id', this.user['id']); // user_id

    for (let i = 0; i < project.files.length; i++) {
      formData.append('files', project.files[i], project.files[i].name)
    }

    this.xhr.promise(this.url, formData, (result) => {
      // if OK THIS IS REALLY REALLY IMPORTANT BECAUSE IF \ OK, HAVE TO DO SOMETHING
      // , add projetct to projects
      result = JSON.parse(result)
      const id = result.id
      //  a function to get the saved project from the database

      const p = this.latest_projects.getValue();
      const ps: any[] = this.latest_projects.getValue()
      // this.latest_projects.next([p, ...ps])

      console.log(result)
      next(id)
    })
  }

  update(project: any, next) {
    if (this.user['id']) {

      const formData: any = new FormData();

      if (project.be) {
        formData.append('be', JSON.stringify(project.be));
      }

      project.courriel_date = this.global.toOracleDate(project.courriel_date);
      project.received_date = this.global.toOracleDate(project.received_date);
      project.user_id = this.user.id;

      formData.append('project', JSON.stringify(project));

      for (let i = 0; i < project.newFiles.length; i++) {
        formData.append('files', project.newFiles[i], project.newFiles[i].name)
      }

      this.xhr.put(this.url, formData, (result) => {
        result = JSON.parse(result)
        next(result.id)
      })
    }
  }


  treat(project, next) {
    const id = project.id;
    const entity_id = this.user.entity_id;
    this.http.post<any>(this.url + '/treat', { id: id, entity_id: entity_id })
      .subscribe(result => {
        next();
        // console.log(result)
      })
  }

  compose(composition, next) {
    // console.log(composition);

    const formData: any = new FormData();
    const project = {
      ref: composition.ref,
      title: composition.title,
      content: composition.content,
      receivers: composition.receivers.join(','),
      sender_entity_id: this.user.entity_id,
      user_id: this.user.id,
    };

    delete composition.be.valid;


    formData.append('project', JSON.stringify(project));
    if (composition.hasBe) {
      formData.append('be', JSON.stringify(composition.be));
    }

    for (let i = 0; i < composition.files.length; i++) {
      formData.append('files', composition.files[i], composition.files[i].name)
    }

    this.xhr.promise(this.url + '/compose', formData, () => {
      next()
    }
    )
  }

}

