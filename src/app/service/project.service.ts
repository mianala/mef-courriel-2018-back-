import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { GlobalService } from './global.service';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EnvService } from './env.service';
import { XhrService } from './xhr.service';
import { FilterService } from './filter.service';
import { project } from 'models/Project';


@Injectable()
export class ProjectService {

  url: string;
  dispatched_projects = new BehaviorSubject([]);
  treated_projects = new BehaviorSubject([]);
  shipped_projects = new BehaviorSubject([]);
  projects = new BehaviorSubject([]);
  latestProjects = new BehaviorSubject([]);
  allProjects = new BehaviorSubject([]);
  project = new BehaviorSubject({
    id: 0,
  });
  last_n_project = new BehaviorSubject(0);
  user;
  options = new RequestOptions({ withCredentials: true });

  constructor(private global: GlobalService,
    private userService: UserService,
    private xhr: XhrService,
    private http: Http) {
    this.url = EnvService.ip() + '/api/projects';
    this.user = this.userService.user.getValue();
    // console.log('initializing projects');

    this.user = this.userService.user.subscribe(user => {
      if (user['id']) {

        this.user = user;
        this.getLatestProjects();
      }
    });

    this.latestProjects.subscribe(projects => {
      this.getSavedProjects(projects);
      this.getTreatedProjects(projects);
      this.getLastNProject(projects)
    });

    if (localStorage.getItem('project')) {
      const project = JSON.parse(localStorage.getItem('project'));
      this.project.next(project);
    }

    this.project.subscribe(project => {
      localStorage.setItem('project', JSON.stringify(project))
    })


  }

  getLastNProject(projects) {
    if (projects[0]) {
      this.last_n_project.next(projects[0]['n_project'])
    }
  }

  getSavedProjects(projects) {

    const ps = FilterService.savedProjects(projects);

    if (this.projects.getValue() == ps) {
      return false
    }
    this.projects.next(ps)
  }

  getDispatchedProjects(projects) {

    const ps = FilterService.dispatchedProjects(projects);

    if (this.dispatched_projects.getValue() == ps) {
      return false
    }
    this.dispatched_projects.next(ps)
  }

  getTreatedProjects(projects) {

    const ps = FilterService.treatedProjects(projects);

    if (this.treated_projects.getValue() == ps) {
      return false
    }
    this.treated_projects.next(ps)
  }


  getShippedProjects(projects) {

    const ps = FilterService.shippedProjects(projects);

    if (this.shipped_projects.getValue() == ps) {
      return false
    }
    this.shipped_projects.next(ps)
  }


  getLatestProjects() {
    if (this.user.entity_id == undefined) {
      return false
    }

    this.http.get(this.url + '/latest/' + this.user.entity_id)
      .map(res => res.json()).subscribe(projects => {
        projects.sort(GlobalService.sortByDate);
        if (this.projects.getValue() == projects) {
          return
        }
        this.latestProjects.next(projects)
      })
  }



  getAllProjects() {
    if (this.user.entity_id == undefined) {
      return false
    }

    this.http.get(this.url + '/all/' + this.user.entity_id)
      .map(res => res.json()).subscribe(projects => {
        projects.sort(GlobalService.sortByDate);
        if (this.projects.getValue() == projects) {
          return
        }
        this.allProjects.next(projects)
      })
  }


  setProject(project) {
    this.project.next(project)
  }

  setProjectFromId(id) {
    this.http.get(this.url + '/' + id)
      .map(res => res.json()).subscribe(project => {
        this.project.next(project)
      })
  }

  deleteProject(project, next) {

    this.http.delete(this.url + '/' + project.id).subscribe(() => {
      next()
    });
    const p = this.latestProjects.getValue();
    p.splice(this.latestProjects.getValue().indexOf(project), 1);
    this.latestProjects.next(p)

  }

  removeProjectFile(id, next) {
    this.http.delete(EnvService.ip() + '/api/files/' + id).subscribe((result) => {
      console.log(result)
      next(result.status)
    })
  }

  save(project: any, next) {

    const formData: any = new FormData();

    if (project.be) {
      formData.append('be', JSON.stringify(project.be));

    }

    formData.append('arrive', project.n_arrive);
    formData.append('user_id', this.user.id); // user_id
    formData.append('sender', project.sender);
    formData.append('ref', project.ref);
    formData.append('type_id', project.type);
    formData.append('lettre_id', project.lettre);
    formData.append('entity_id', project.entity_id);
    formData.append('title', project.content);
    formData.append('content', project.observations);
    formData.append('date', this.global.toOracleDate(project.date));
    formData.append('received_date', this.global.toOracleDate(project.received_date));

    for (let i = 0; i < project.files.length; i++) {
      formData.append('files', project.files[i], project.files[i].name)
    }

    this.xhr.promise(this.url, formData, (result) => {
      // if OK THIS IS REALLY REALLY IMPORTANT BECAUSE IF NOT OK, HAVE TO DO SOMETHING
      // , add projetct to projects
      result = JSON.parse(result)
      const id = result.id
      var p = {
        id: result.id,
        ref: project.ref,
        n_arrive: project.n_arrive,
        n_arrive_dg: project.n_arrive,
        numero: 123,
        date: project.date,
        courriel_date: project.date,
        received_date: project.received_date,
        content: project.observations,
        entity_id: project.entity_id,
        user_id: this.user.id,
        type_id: project.type,
        letter_id: 0,
        status_id: 0,
        dispatched: 0,
        composed: 0,
        n_project: 0,
        entity_label: this.user.entity_label,
        sender: project.sender,
        title: project.content,
        files: project.files,

        departure_date: new Date(),
        status_date: new Date(),
      }
      const ps: any[] = this.latestProjects.getValue()
      this.latestProjects.next([p, ...ps])
      
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
    this.http.post(this.url + '/treat', { id: id, entity_id: entity_id }, this.options)
      .subscribe(result => {
        next();
        // console.log(result)
      })
  }

  compose(composition, next) {
    // console.log(composition);

    const formData: any = new FormData();
    const project = {
      sender_entity_id: this.user.entity.id,
      content: composition.content,
      title: composition.title,
      receivers: composition.receivers.join(','),
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

