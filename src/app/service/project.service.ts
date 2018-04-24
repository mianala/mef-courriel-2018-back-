import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {NotificationService} from './notification.service';
import {GlobalService} from './global.service';
import {UserService} from './user.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ThreadService} from "./thread.service";
import {FlowService} from "./flow.service";
import {EnvService} from "./env.service";


@Injectable()
export class ProjectService {

  url: string;
  dispatched_projects = new BehaviorSubject([]);
  projects = new BehaviorSubject([]);
  project = new BehaviorSubject({
    id: 0,
  });
  user;

  constructor(private global: GlobalService,
              private userService: UserService,
              private threadService: ThreadService,
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
        this.getDispatchedProjects()
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
      projects.sort(function (b, a) {
        const c = a.id;
        const d = b.id;
        return c - d;
      });

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
      projects.sort(function (b, a) {
        const c = a.id;
        const d = b.id;
        return c - d;
      });


      if (this.dispatched_projects.getValue() == projects) {
        return false
      }
      this.dispatched_projects.next(projects)
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

  save(project: any) {
    this.post(project).then((result) => {
      console.log('fetching result from the result of the post project');
      this.getProjects()
    }, (error) => {
      console.log(error)
    })
  }

  post(project: any) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

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

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', this.url, true);
      xhr.send(formData);
      this.notification.projectSaved()
    });
  }

  remove(id: number) {
    this.http.delete(this.url + '/' + id + '/' + this.user.id).subscribe(data => {
      console.log('project ' + id + ' removed');
      console.log('updating project list');
      this.getProjects()
      // this.notification.projectRemoved()
    })
  }

}

