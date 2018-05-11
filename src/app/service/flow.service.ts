import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {UserService} from './user.service';
import {NotificationService} from './notification.service';
import {GlobalService} from './global.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Flow} from '../../models/Flow';
import {Router} from '@angular/router';
import {ProjectService} from './project.service';
import {EnvService} from './env.service';
import {XhrService} from './xhr.service';
import {FilterService} from './filter.service';

@Injectable()
export class FlowService {
  url: string;
  options = new RequestOptions({withCredentials: true});

  //in boite
  all_flows = new BehaviorSubject([]);
  flows = new BehaviorSubject([]);
  sent_flows = new BehaviorSubject([]);
  // in traité
  treated_flows = new BehaviorSubject([]);
  // in expediés
  shipped_flows = new BehaviorSubject([]);
  //imported
  returned_flows = new BehaviorSubject([]);

  project_flows = new BehaviorSubject([]);

  flow = new BehaviorSubject({});
  be = new BehaviorSubject({});
  shipped_flow = new BehaviorSubject({});
  answerData = new BehaviorSubject({});
  user;

  constructor(private http: Http,
              private notification: NotificationService,
              private projectService: ProjectService,
              private userService: UserService,
              private xhr: XhrService) {
    this
      .url = EnvService.ip() + '/api/flows';
    this
      .user = this.userService.user.getValue();

    this.userService.user.subscribe(user => {

      if (user['id']) {
        this.user = user;
        this.getAllFlows()
        this.projectService.project.subscribe(project => {
          this.getProjectFlows(project.id)
        })

        this.all_flows.subscribe(flows => {
          this.getFlows(flows);
          this.getTreatedFlows(flows);
          this.getSentFlows(flows);
          this.getShippedFlows(flows);
          this.getReturnedFlows(flows)
        })

      }
    });

  }


  update() {

    this.http.get(this.url + '/user/' + this.user['id'])
      .map(res => res.json()).subscribe(flows => {
      {
        flows.sort(GlobalService.sortByDate);
        this.flows.next(flows)
      }
    })
  }

  setFlow(flow) {
    this.flow.next(flow)
  }


  treat(id: number) {
    console.log('treating flow ' + id);
    this.http.post(this.url + '/treat', {id: id, entity_id: this.user.entity_id}, this.options)
      .subscribe(result => {
        console.log(result)
      })
  }

  getFlows(flows) {

    let ps = FilterService.inbox(flows, this.user)

    if (this.flows.getValue() == ps) {
      return false
    }

    console.log(ps)
    this.flows.next(ps)
  }

  getAllFlows() {
    console.log('loading all flows');

    if (this.user.entity_id == undefined) {
      return false
    }

    this.http.get(this.url + '/all/' + this.user.entity_id)
      .map(res => res.json()).subscribe(flows => {

      flows.sort(GlobalService.sortByDate)

      this.all_flows.next(flows)
    })
  }

  getSentFlows(flows) {
    let ps = FilterService.sentFlow(flows, this.user)

    if (this.sent_flows.getValue() == ps) {
      return false
    }
    this.sent_flows.next(ps)
  }

  getTreatedFlows(flows) {
    let ps = FilterService.treatedFlow(flows)

    if (this.treated_flows.getValue() == ps) {
      return false
    }
    this.treated_flows.next(ps)
  }

  getShippedFlows(flows) {
    let ps = FilterService.shippedFlow(flows)

    if (this.shipped_flows.getValue() == ps) {
      return false
    }
    this.shipped_flows.next(ps)
  }

  getReturnedFlows(flows) {
    let ps = FilterService.importedFlow(flows)

    if (this.returned_flows.getValue() == ps) {
      return false
    }
    this.returned_flows.next(ps)
  }

  getProjectFlows(id) {
    console.log('loading project flows  ' + id);
    this.http.get(this.url + '/project/' + id)
      .map(res => res.json()).subscribe(flows => {
      flows.sort(GlobalService.sortByDate);
      if (this.project_flows.getValue() == flows) {
        return false
      }
      this.project_flows.next(flows)
    })
  }

  answerFlow(answer, next) {
    const formData: any = new FormData();

    formData.append('flow_id', this.answerData.getValue()['flow_id']);
    formData.append('sender_entity_id', this.user.entity.id);
    formData.append('entity_id', this.answerData.getValue()['entity_id']);
    formData.append('user_id', this.user.id);
    formData.append('content', answer.content);

    for (let i = 0; i < answer.files.length; i++) {
      formData.append('files', answer.files[i], answer.files[i].name)
    }

    this.xhr.promise(this.url + '/reply', formData, () => {
      next()
    })
  }


  ship(flow, next) {
    if (this.user['id']) {


      const formData: any = new FormData();

      formData.append('project_id', flow.project_id);
      formData.append('sender_entity_id', this.user.entity.id);
      formData.append('destination', flow.receiver);
      formData.append('content', flow.content);
      formData.append('ship_for', flow.ship_for);
      formData.append('user_id', this.user.id);

      for (let i = 0; i < flow.files.length; i++) {
        formData.append('files', flow.files[i], flow.files[i].name)
      }


      this.xhr.promise(this.url + '/ship', formData, () => {
        next()
      })
    } else {
      console.log('user not connected')
    }

  }

  _import(flow, next) {
    if (this.user['id']) {
      const formData: any = new FormData();

      formData.append('numero', flow.numero);
      formData.append('project_id', flow.project_id);
      formData.append('entity_id', this.user.entity.id);
      formData.append('sender', flow.sender);
      formData.append('content', flow.content);
      formData.append('status_id', flow.status_id);
      formData.append('user_id', this.user.id);

      for (let i = 0; i < flow.files.length; i++) {
        formData.append('files', flow.files[i], flow.files[i].name)
      }
      this.xhr.promise(this.url + '/import', formData, () => {
        next()
      })
    } else {
      console.log('user not connected')
    }

  }

  shipWithBe(flow, be) {
    console.log(this.user);

    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('flow_id', this.flow.getValue()['flow_id']);
      formData.append('sender_entity_id', this.user.entity.id);
      formData.append('destination', flow.receiver);
      formData.append('ship_for', flow.ship_for);
      formData.append('user_id', this.user.id);
      formData.append('be_entity', be.entity);
      formData.append('be_author', be.author);
      formData.append('be_receiver', be.receiver);
      formData.append('be_numero', be.numero);
      formData.append('be_observation', be.observation);
      formData.append('be_content', be.content);

      for (let i = 0; i < flow.files.length; i++) {
        formData.append('files', flow.files[i], flow.files[i].name)
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
            // we got the be from the server we can print it
            console.log(xhr.response);
            be.next(xhr.response);

            // now we open the page of be
            // router.navigateByUrl('/impression-BE')

            console.log(xhr.response)
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', this.url + '/ship/be', true);
      xhr.send(formData)

      //  shipwithbe notification
    });
  }

  decommission(flow) {
    console.log('decommissioning');

    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('flow_id', this.flow.getValue()['id']);
      formData.append('sender_entity_id', this.user.entity.id);
      formData.append('entity_id', flow.entity.id);
      formData.append('reason', flow.content);
      formData.append('user_id', this.user.id);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', this.url + '/decommission', true);
      xhr.send(formData)

      //  decommission notification
    });
  }

  share(flow) {
    console.log(this.user);

    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('flow_id', this.flow.getValue()['id']);
      formData.append('receivers', flow.receivers);
      formData.append('user_id', this.user.id);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', this.url + '/share', true);
      xhr.send(formData)

      //  share notification
    });
  }

}
