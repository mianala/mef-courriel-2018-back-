import {Injectable} from '@angular/core'
import {Http, RequestOptions} from '@angular/http'
import {NotificationService} from './notification.service'
import {GlobalService} from "./global.service";
import {UserService} from "./user.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class EmailService {
  url: string
  options = new RequestOptions({withCredentials: true});
  emails = new BehaviorSubject([])

  constructor(private http: Http,
              private userService: UserService,
              private global: GlobalService, private notification: NotificationService) {
    this.url = global.ip() + '/api/flows/';
    this.getEmails()
  }

  getEmails() {
    console.log('loading flows')
    this.userService.userObject.subscribe(user => {

      this.http.get(this.url + flowId + '/emails', this.options)
        .map(res => res.json()).subscribe(emails => {

        emails.sort(function (b, a) {
          const c = a.id;
          const d = b.id;
          return c - d;
        });
        this.emails.next(flows)
      })
    })
  }

  answerFlow(mail?: any) {
    this.post(mail).then((result) => {
      console.log(result)
    }, (error) => {
      console.log(error)
    })

  }

  post(mail: any) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData()
      const xhr = new XMLHttpRequest()

      formData.append('title', mail.title)
      formData.append('content', mail.content)
      formData.append('flow_id', mail.flow_id)
      formData.append('writer_id', mail.activeUser.id)
      formData.append('sent_by', mail.starter)

      for (let i = 0; i < mail.files.length; i++) {
        formData.append('files', mail.files[i], mail.files[i].name)
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

      xhr.open('POST', this.url + '/flow', true);
      xhr.send(formData)
      this.notification.emailSent()
    });
  }

  saveEmail() {
    this.notification.emailSaved()
  }
}
