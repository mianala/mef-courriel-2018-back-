import {Injectable} from '@angular/core'
import {Http, RequestOptions} from '@angular/http'
import {NotificationService} from './notification.service'
import {GlobalService} from './global.service';
import {UserService} from './user.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {FlowService} from "./flow.service";

@Injectable()
export class EmailService {
  url: string
  options = new RequestOptions({withCredentials: true});
  emails = new BehaviorSubject([])
  flow

  constructor(private http: Http,
              private userService: UserService,
              private global: GlobalService,
              private flowService: FlowService,
              private notification: NotificationService) {
    this.url = global.ip() + '/api/emails/';

    this.getEmails()
  }

  getEmails() {
    this.flowService.flow.subscribe(flow => {
      this.getFlowEmails(flow)
      this.flow = flow
    })
  }


  getFlowEmails(flow) {
    console.log('loading emails')
    this.userService.userObject.subscribe(user => {

      this.http.get(this.url + flow.id + '/' + user.id, this.options)
        .map(res => res.json()).subscribe(emails => {

        emails.sort(function (b, a) {
          const c = a.id;
          const d = b.id;
          return c - d;
        });
        this.emails.next(emails)
      })
    })
  }

  answerFlow(mail?: any) {
    this.userService.userObject.subscribe(user => {
      this.flowService.flow.subscribe(flow => {
        this.post(user, flow, mail).then((result) => {
          this.getFlowEmails(flow)
          console.log(result)
        }, (error) => {
          console.log(error)
        })
      })
    })

  }

  post(user, flow, mail: any) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData()
      const xhr = new XMLHttpRequest()

      formData.append('title', mail.title)
      formData.append('content', mail.content)
      formData.append('flow_id', flow.id)
      formData.append('writer_id', user.id)
      formData.append('sent_by', flow.writer_id == user.id ? 1 : 0)

      for (let i = 0; i < mail.files.length; i++) {
        formData.append('files', mail.files[i], mail.files[i].name)
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

      xhr.open('POST', this.url + 'flow', true);
      xhr.send(formData)
      this.notification.emailSent()
    });
  }

  delete(id: number) {
    this.http.delete(this.url + '/' + id).subscribe(data => {
      console.log('email ' + id + ' removed')
      this.getEmails()
      console.log('updating email list')
      this.notification.emailRemoved()
    })
  }

  saveEmail() {
    this.notification.emailSaved()
  }
}
