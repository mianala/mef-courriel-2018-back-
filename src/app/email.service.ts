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

  sendEmail(mail?: any) {
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
      formData.append('starter_id', mail.starter.id)
      formData.append('receiver_id', mail.receiver.id)

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

      xhr.open('POST', this.url, true);
      xhr.send(formData)
      this.notification.emailSent()
    });
  }

  saveEmail() {
    this.notification.emailSaved()
  }
}
