import {Injectable} from '@angular/core'
import {Http, RequestOptions} from '@angular/http'
import {NotificationService} from './notification.service'

@Injectable()
export class EmailService {
  url = 'http://localhost:3000/api/flows/'
  options = new RequestOptions({withCredentials: true});

  constructor(private http: Http, private notification: NotificationService) {
  }

  getEmails(flowId: number) {
    return this.http.get(this.url + flowId + '/emails', this.options)
      .map(res => res.json())
  }

  answerFlow(mail?: any) {
    this.post(mail).then((result) => {
      console.log(result)
    }, (error) => {
      console.log(error)
    })

  }

  post(mail: any) {
    console.log(mail)
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
