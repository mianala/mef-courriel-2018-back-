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


@Injectable()
export class ProjectService {

  url: string;
  dispatched_projects = new BehaviorSubject([]);
  treated_projects = new BehaviorSubject([]);
  projects = new BehaviorSubject([]);
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
        this.getProjects();
        this.getDispatchedProjects();
        this.getTreatedProjects()
      }
    });

    if (localStorage.getItem('project')) {
      const project = JSON.parse(localStorage.getItem('project'));
      this.project.next(project);
      this.flowService.getProjectFlows(project.id)
    }
  }

  getProjects() {
    if (this.user.entity_id == undefined) {
      return false
    }

    console.log('loading projects of entity ' + this.user.entity_id);

    this.http.get(this.url + '/entity/' + this.user.entity_id)
      .map(res => res.json()).subscribe(projects => {
      projects.sort(GlobalService.sortByDate);

      if (this.projects.getValue() == projects) {
        return
      }
      this.projects.next(projects)
    })
  }

  getDispatchedProjects() {
    if (this.user.entity_id == undefined) {
      return false
    }

    console.log('loading projects of entity ' + this.user.entity_id);

    this.http.get(this.url + '/dispatched/' + this.user.entity_id)
      .map(res => res.json()).subscribe(projects => {
      projects.sort(GlobalService.sortByDate);


      if (this.dispatched_projects.getValue() == projects) {
        return false
      }
      this.dispatched_projects.next(projects)
    })
  }

  getTreatedProjects() {
    if (this.user.entity_id == undefined) {
      return false
    }

    console.log('loading treated projects of entity ' + this.user.entity_id);

    this.http.get(this.url + '/treated/' + this.user.entity_id)
      .map(res => res.json()).subscribe(projects => {
      projects.sort(GlobalService.sortByDate);


      if (this.treated_projects.getValue() == projects) {
        return false
      }
      this.treated_projects.next(projects)
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

  remove(id: number) {
    this.http.delete(this.url + '/' + id + '/' + this.user.id).subscribe(data => {
      console.log('project ' + id + ' removed');
      console.log('updating project list');
      this.getProjects()
      // this.notification.projectRemoved()
    })
  }

  treat(project) {
    const id = project.id
    const entity_id = this.user.entity_id
    this.http.post(this.url + '/treat', {id: id, entity_id: entity_id}, this.options)
      .subscribe(result => {
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

