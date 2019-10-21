import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';
import { EnvService } from './env.service';
import { XhrService } from './xhr.service';
import { FilterService } from './filter.service';
import { project } from 'models/Project';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';


@Injectable()
export class ProjectService {

  url: string;
  all_projects = new BehaviorSubject([]);
  local_all_projects = [];
  projects = new BehaviorSubject([]); // last projects
  new_projects = new BehaviorSubject([]);

  filtered_projects = new BehaviorSubject([]);
  searched_projects = new BehaviorSubject([]);

  treated_projects = new BehaviorSubject([]);
  latest_projects = new BehaviorSubject([]);
  project = new BehaviorSubject({
    id: 0,
  });
  last_n_project = new BehaviorSubject(0);
  user;

  constructor(private global: GlobalService, private notification: NotificationService,
    private userService: UserService, private filterService: FilterService,
    private xhr: XhrService,
    private http: HttpClient) {
    this.url = EnvService.ip() + '/api/projects';

    // console.log('initializing projects');

    this.userService.user.subscribe(user => {
      if (user['id']) {
        this.user = user;
        this.getProjects();
      }
    });

    this.all_projects.subscribe(projects => {
      if (!projects) {
        return
      }
      if (!projects.length) {
        return
      }

      this.filterProjects()
    });

    this.filterService.query.subscribe(query => {

      this.search()
    })

    this.filterService.filters.subscribe(filters => {
      this.filterProjects()
    })

    // store the actual project in localstorage so that it's still accessible after refresh
    if (localStorage.getItem('project')) {
      const p = JSON.parse(localStorage.getItem('project'));
      this.project.next(p);
    }
    this.project.subscribe(p => {
      localStorage.setItem('project', JSON.stringify(p))
    })
  }

  search() {
    this.searched_projects.next(FilterService.searchProject(this.filtered_projects.getValue(), this.filterService.query.getValue()))
  }

  filterProjects() {
    this.filtered_projects.next(FilterService.filterProjects(this.all_projects.getValue(), this.filterService.filters.getValue()))
    this.search()
  }

  getLastNProject(projects) {
    if (projects[0]) {
      this.last_n_project.next(projects[0]['n_project'])
    }
  }

  refreshProjects(ps) {

  }

  exportXLS(projects) {
    this.http.post(this.url + '/print', { project: JSON.stringify(projects) })
      .subscribe(result => {
        console.log(result)
        window.open(EnvService.ip() + '/export/' + result, '_blank')
      })
  }

  // export all projects
  exportALL() {
    this.http.post(this.url + '/export-all', { entity_id: this.user.entity_id })
      .subscribe(result => {
        console.log(result)
        window.open(EnvService.ip() + '/exports/' + result, '_blank')
      })
  }

  // add a project in list
  addProject(p) {
    this.all_projects.next([p, ...this.all_projects.getValue()])
  }

  // replace a project from projects
  updateProject(p) {
    this.all_projects.next(p)
  }


  getProjects() {
    // if it's a in localstorage
    if (localStorage.getItem('all_projects')) {
      this.getAllProjects()
      return
    }

    this.http.get<any>(this.url + '/latest/' + this.user.entity_id)
      .subscribe(projects => {
        this.getAllProjects()
      })
  }

  // all entity projects
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

  // delete the project
  deleteProject(project, next) {

    this.http.delete(this.url + '/' + project.id).subscribe(() => {
      next()
    });
    const p = this.all_projects.getValue();
    p.splice(this.all_projects.getValue().indexOf(project), 1);
    this.all_projects.next(p)
  }

  updateStatus(project, status_id) {
    const project_id = project.id
    const entity_id = project.entity_id
    this.http.put<any>(this.url + '/update_project_status', { project_id: project_id, status_id: status_id, entity_id: entity_id }).subscribe(result => {
      if (result) {
        this.notification.statusUpdated()
      }
    })
  }

  // get project's files
  getProjectFiles(id, next) {
    this.http.get(EnvService.ip() + '/api/files/project/' + id).subscribe((files) => {
      next(files)
    })
  }


  // remove the project's files
  removeProjectFile(id, next) {
    this.http.delete(EnvService.ip() + '/api/files/' + id).subscribe((result) => {
      console.log(result)
      // next(result.status)
    })
  }

  // save project
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
    formData.append('description', project.description);
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

  // update project
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

  // removed soon
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

