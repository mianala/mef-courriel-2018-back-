import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {UserService} from './user.service';
import {NotificationService} from './notification.service';
import {GlobalService} from './global.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Flow} from '../models/Flow';
import {ProjectService} from "./projects/project.service";

@Injectable()
export class FlowService {
  url: string

  //in boite
  flows = new BehaviorSubject([])
  sent_flows = new BehaviorSubject([])
  // in traité
  treated_flows = new BehaviorSubject([])
  // in expediés
  shipped_flows = new BehaviorSubject([])
  // in dispatché
  dispatched_flows = new BehaviorSubject([])

  projectFlows = new BehaviorSubject([])
  flow = new BehaviorSubject({})
  shipped_flow = new BehaviorSubject({})
  answerData = new BehaviorSubject({})
  user

  constructor(private http: Http,
              private notification: NotificationService,
              private userService: UserService,
              private projectService: ProjectService,
              private global: GlobalService) {
    this.url = global.ip() + '/api/flows';
    this.user = this.userService.user.getValue()
    this.user = this.userService.user.subscribe(user => {
      if (user['id']) {
        this.user = user
        this.getFlows()
        this.getSentFlows()
      }
    })

    this.projectService.project.subscribe(project => {
      this.getProjectFlows(project['id'])
    })
  }


  update() {

    this.http.get(this.url + '/user/' + this.user['id'])
      .map(res => res.json()).subscribe(flows => {
      {
        flows.sort(function (b, a) {
          const c = new Date(a.date_created);
          const d = new Date(b.date_created);
          return c > d;
        });
        this.flows.next(flows)
      }
    })
  }

  reload() {
    console.log('reloading flow')
    const flow = localStorage.getItem('flow')
    if (flow) {
      this.flow.next(JSON.parse(flow))
    }
  }

  setFlow(id: number) {
    console.log('setting flow ' + id)

    if (this.flow.getValue()['id'] === id) {

    } else {
      this.http.get(this.url + '/' + this.userService.user.getValue()['entity_id'] + '/' + id)
        .map(res => res.json()).subscribe(
        flow => {
          this.flow.next(flow)
          localStorage.setItem('flow', JSON.stringify(flow))
        })
    }
  }

  getFlows() {

    console.log('loading flows')

    this.http.get(this.url + '/entity/' + this.user.entity_id)
      .map(res => res.json()).subscribe(flows => {

      flows.sort(function (b, a) {
        const c = a['id'];
        const d = b['id'];
        return c - d;
      });
      this.flows.next(flows)
    })
  }

  getSentFlows() {

    console.log('loading flows')

    this.http.get(this.url + '/entity/sent/' + this.user.entity_id)
      .map(res => res.json()).subscribe(flows => {

      flows.sort(function (b, a) {
        const c = a['id'];
        const d = b['id'];
        return c - d;
      });
      this.sent_flows.next(flows)
    })
  }

  getShippedFlows() {

    console.log('loading flows')

    this.http.get(this.url + '/shipped/' + this.user.entity_id)
      .map(res => res.json()).subscribe(flows => {

      flows.sort(function (b, a) {
        const c = a['id'];
        const d = b['id'];
        return c - d;
      });
      this.shipped_flows.next(flows)
    })
  }

  getProjectFlows(id) {
    console.log('loading project flows  ' + id)
    this.http.get(this.url + '/project/' + id)
      .map(res => res.json()).subscribe(flows => {
      flows.sort(function (b, a) {
        const c = a['id'];
        const d = b['id'];
        return c - d;
      });
      this.projectFlows.next(flows)
    })
  }

  start(mail?: any) {

    this.post(mail).then((result) => {
      console.log(result)
      // this.update()
    }, (error) => {
      console.log(error)
    })

  }

  post(mail: any) {

    console.log('posting mail')
    console.log(mail)
    return new Promise((resolve, reject) => {
      const formData: any = new FormData()
      const xhr = new XMLHttpRequest()

      formData.append('title', mail.title)
      formData.append('content', mail.content)
      formData.append('starter_id', this.user['id'])
      formData.append('receiver_id', mail.user['id'])
      if (mail.savedId) {
        formData.append('saved_id', mail.savedId)
      } else {
        formData.append('saved_id', 0)

      }

      if (mail.files) {
        for (let i = 0; i < mail.files.length; i++) {
          formData.append('files', mail.files[i], mail.files[i].name)
        }
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST', this.url, true);
      xhr.send(formData)
      this.notification.emailSent()
    });
  }

  answerFlow(answer){
    console.log(this.user)

    return new Promise((resolve, reject) => {
      const formData: any = new FormData()
      const xhr = new XMLHttpRequest()

      formData.append('flow_id', this.answerData.getValue()['flow_id'])
      formData.append('sender_entity_id', this.user.entity.id)
      formData.append('user_id', this.user.id)
      formData.append('content', answer.content)

      for (let i = 0; i < answer.files.length; i++) {
        formData.append('files', answer.files[i], answer.files[i].name)
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST', this.url+'/reply', true);
      xhr.send(formData)
      this.notification.answered()
    });
  }

  ship(answer){
    console.log(this.user)

    return new Promise((resolve, reject) => {
      const formData: any = new FormData()
      const xhr = new XMLHttpRequest()

      formData.append('flow_id', this.answerData.getValue()['flow_id'])
      formData.append('sender_entity_id', this.user.entity.id)
      formData.append('destination', answer.destination)
      formData.append('content', answer.content)
      formData.append('be', answer.be)
      formData.append('user_id', this.user.id)

      for (let i = 0; i < answer.files.length; i++) {
        formData.append('files', answer.files[i], answer.files[i].name)
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST', this.url+'/ship', true);
      xhr.send(formData)

    //  ship notification
    });
  }

  decommission(flow){
    console.log(this.user)

    return new Promise((resolve, reject) => {
      const formData: any = new FormData()
      const xhr = new XMLHttpRequest()

      formData.append('flow_id', this.flow.getValue()['id'])
      formData.append('sender_entity_id', flow.entity.id)
      formData.append('entity_id', this.user.entity.id)
      formData.append('user_id', this.user.id)

      for (let i = 0; i < flow.files.length; i++) {
        formData.append('files', flow.files[i], flow.files[i].name)
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST', this.url+'/decommission', true);
      xhr.send(formData)

    //  decommission notification
    });
  }

  share(flow){
    console.log(this.user)

    return new Promise((resolve, reject) => {
      const formData: any = new FormData()
      const xhr = new XMLHttpRequest()

      formData.append('flow_id', this.flow.getValue()['id'])
      formData.append('sender_entity_id', flow.entity.id)
      formData.append('entity_id', this.user.entity.id)
      formData.append('receivers', flow.receivers)
      formData.append('user_id', this.user.id)

      for (let i = 0; i < flow.files.length; i++) {
        formData.append('files', flow.files[i], flow.files[i].name)
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST', this.url+'/decommission', true);
      xhr.send(formData)

    //  decommission notification
    });
  }

  importFlow(imported){
    console.log(this.user)

    return new Promise((resolve, reject) => {
      const formData: any = new FormData()
      const xhr = new XMLHttpRequest()

      formData.append('flow_id', this.shipped_flow.getValue()['id'])
      formData.append('content', imported.content)
      formData.append('status_id', imported.status)
      formData.append('user_id', this.user.id)

      for (let i = 0; i < imported.files.length; i++) {
        formData.append('files', imported.files[i], imported.files[i].name)
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST', this.url+'/ship', true);
      xhr.send(formData)
    //  import notification
    });
  }

  delete(id: number) {
    this.http.delete(this.url + '/' + id + '/' + this.user['id']).subscribe(data => {
      console.log('flow ' + id + ' removed')
      console.log('updating flow list')
      this.notification.flowRemoved()
      this.update()
    })
  }
}
