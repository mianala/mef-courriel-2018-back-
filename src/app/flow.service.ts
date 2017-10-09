import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {UserService} from './user.service';
import {NotificationService} from './notification.service';
import {GlobalService} from './global.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Flow} from '../models/Flow';
import {Router} from "@angular/router";

@Injectable()
export class FlowService {
  url: string
  user: any
  flows = new BehaviorSubject([])
  flow = new BehaviorSubject(new Flow())
  unseenflowCount = new BehaviorSubject(0)

  constructor(private http: Http,
              private router: Router,
              private notification: NotificationService,
              private userService: UserService,
              private global: GlobalService) {
    this.url = global.ip() + '/api/flows';
    console.log('initializing flows')


    this.getFlows()

    // todo realtime
  }

  getFlows() {
    console.log('loading flows')
    this.userService.userObject.subscribe(user => {

      this.http.get(this.url + '/user/' + user.id)
        .map(res => res.json()).subscribe(flows => {

        flows.sort(function (b, a) {
          const c = a.id;
          const d = b.id;
          return c - d;
        });
        this.flows.next(flows)
      })
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
    this.userService.userObject.subscribe(user => {

      this.http.get(this.url + '/' + user.id + '/' + id)
        .map(res => res.json()).subscribe(
        flow => {
          console.log(flow)
          this.flow.next(flow)
          localStorage.setItem('flow', JSON.stringify(flow))
        })
    })
  }

  start(mail?: any) {
    this.userService.userObject.subscribe(user => {

      this.post(mail, user).then((result) => {
        console.log(result)
        this.getFlows()
      }, (error) => {
        console.log(error)
      })
    })

  }

  post(mail: any, user) {

    console.log('posting mail')
    console.log(mail)
    return new Promise((resolve, reject) => {
      const formData: any = new FormData()
      const xhr = new XMLHttpRequest()

      formData.append('title', mail.title)
      formData.append('content', mail.content)
      formData.append('starter_id', user.id)
      formData.append('receiver_id', mail.user.id)
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

  delete(id: number) {
    this.userService.userObject.subscribe(user => {
      this.http.delete(this.url + '/' + id + '/' + user.id).subscribe(data => {
        console.log('flow ' + id + ' removed')
        console.log('updating flow list')
        this.notification.flowRemoved()
        this.getFlows()
      })
    })
  }
}
