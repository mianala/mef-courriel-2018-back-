import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {GlobalService} from './global.service';
import {UserService} from './user.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {EnvService} from './env.service';
import {XhrService} from './xhr.service';
import {FilterService} from './filter.service';


@Injectable()
export class ProjectService {

  url: string;
  dispatched_projects = new BehaviorSubject([]);
  treated_projects = new BehaviorSubject([]);
  shipped_projects = new BehaviorSubject([]);
  projects = new BehaviorSubject([]);
  all_projects = new BehaviorSubject([]);
  project = new BehaviorSubject({
    id: 0,
  });
  user;
  options = new RequestOptions({withCredentials: true});

  constructor(private global: GlobalService,
              private userService: UserService,
              private xhr: XhrService,
              private http: Http) {
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
      this.getSavedProjects(projects);
      this.getTreatedProjects(projects);
      this.getShippedProjects(projects);
      this.getDispatchedProjects(projects)
    });

    if (localStorage.getItem('project')) {
      const project = JSON.parse(localStorage.getItem('project'));
      this.project.next(project);
    }

    this.project.subscribe(project => {
      localStorage.setItem('project', JSON.stringify(project))
    })


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

      this.shipped_projects.next(projects);
      this.all_projects.next(projects)
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

  save(project: any, next) {

    let formData: any = new FormData();

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

    this.xhr.promise(this.url, formData, () => {
      next()
    })

  }


  treat(project, next) {
    const id = project.id;
    const entity_id = this.user.entity_id;
    this.http.post(this.url + '/treat', {id: id, entity_id: entity_id}, this.options)
      .subscribe(result => {
        next();
        console.log(result)
      })
  }

  compose(composition, next) {
    console.log(composition);

    let formData: any = new FormData();
    const project = {
      sender_entity_id: this.user.entity.id,
      content: composition.content,
      title: composition.title,
      receivers: composition.receivers.join(','),
      user_id: this.user.id,
    };

    delete composition.be.valid


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

