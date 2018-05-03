import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {NotificationService} from './notification.service';
import {GlobalService} from './global.service';
import {UserService} from './user.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ThreadService} from "./thread.service";
import {FlowService} from "./flow.service";
import {EnvService} from "./env.service";
import {XhrService} from "./xhr.service";
import {FilterService} from "./filter.service";


@Injectable()
export class ProjectService {

  url: string;
  dispatched_projects = new BehaviorSubject([]);
  treated_projects = new BehaviorSubject([]);
  projects = new BehaviorSubject([]);
  all_projects = new BehaviorSubject([]);
  project = new BehaviorSubject({
    id: 0,
  });
  user;
  options = new RequestOptions({withCredentials: true});

  constructor(private global: GlobalService,
              private userService: UserService,
              private threadService: ThreadService,
              private xhr: XhrService,
              private flowService: FlowService,
              private http: Http,
              private notification: NotificationService) {
    this.url = EnvService.ip() + '/api/projects';
    this.user = this.userService.user.getValue();
    console.log('initializing projects');


    this.user = this.userService.user.subscribe(user => {
      if (user['id']) {

        this.user = user;
        this.getAllProjects();
      }
    });

    this.all_projects.subscribe(projects => {
      this.getSavedProjects(projects)
      this.getTreatedProjects(projects)
      this.getDispatchedProjects(projects)
    })

    if (localStorage.getItem('project')) {
      const project = JSON.parse(localStorage.getItem('project'));
      this.project.next(project);
      this.flowService.getProjectFlows(project.id)
    }
  }

  getSavedProjects(projects){

    let ps = FilterService.savedProjects(projects)

    if (this.projects.getValue() == ps) {
      return false
    }
    this.projects.next(ps)
  }
  getDispatchedProjects(projects){

    let ps = FilterService.dispatchedProjects(projects)

    if (this.projects.getValue() == ps) {
      return false
    }
    this.dispatched_projects.next(ps)
  }
  getTreatedProjects(projects){

    let ps = FilterService.treatedProjects(projects)

    if (this.treated_projects.getValue() == ps) {
      return false
    }
    this.treated_projects.next(ps)
  }


  getAllProjects() {
    if (this.user.entity_id == undefined) {
      return false
    }

    console.log('loading all projects ' + this.user.entity_id);

    this.http.get(this.url + '/all/' + this.user.entity_id)
      .map(res => res.json()).subscribe(projects => {
      projects.sort(GlobalService.sortByDate);

      if (this.projects.getValue() == projects) {
        return
      }
      this.all_projects.next(projects)
    })
  }


  reload() {
    // todo if nothing in the actual project

    console.log('reloading project');
    const project = localStorage.getItem('project');
    if (project) {
      this.project.next(JSON.parse(project))
    }
  }

  setProject(id: number) {
    this.threadService.getProjectThreads(id);
    this.flowService.getProjectFlows(id);
    console.log('setting project ' + id);
    this.http.get(this.url + '/' + id)
      .map(res => res.json()).subscribe(project => {
      this.project.next(project);
      localStorage.setItem('project', JSON.stringify(project))
    })

  }

  save(project: any, next) {

    const formData: any = new FormData();
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

    this.xhr.promise(this.url, formData, () => {
      next()
    })

  }


  treat(project,next) {
    const id = project.id
    const entity_id = this.user.entity_id
    this.http.post(this.url + '/treat', {id: id, entity_id: entity_id}, this.options)
      .subscribe(result => {
        next()
        console.log(result)
      })
  }

  compose(composition,next) {
    console.log(composition);

    const formData: any = new FormData();

    formData.append('sender_entity_id', this.user.entity.id);
    formData.append('content', composition.content);
    formData.append('title', composition.title);
    formData.append('receivers', composition.receivers);
    formData.append('direction', composition.direction);
    formData.append('user_id', this.user.id);

    for (let i = 0; i < composition.files.length; i++) {
      formData.append('files', composition.files[i], composition.files[i].name)
    }

    this.xhr.promise(this.url+'/compose', formData, () => {
        next()
      }
    )
  }

}

