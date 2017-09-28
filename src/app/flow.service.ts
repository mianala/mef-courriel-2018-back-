import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {UserService} from "./user.service";
import {NotificationService} from "./notification.service";
import {GlobalService} from "./global.service";

@Injectable()
export class FlowService {
  url: string
  user: any

  constructor(private http: Http,
              private notification: NotificationService, private userService: UserService, private global: GlobalService) {
    this.url = global.ip() + '/api/flows';

  }

  getFlows(userId) {
    return this.http.get(this.url + '/user/' + userId)
      .map(res => res.json())
  }

  getUnseenFlowsNumber() {
    return this.http.get(this.url + '/unseen-flows-number')
    // .map(res => res.json())
  }

  getFlow(userId: number, id: number) {
    return this.http.get(this.url + '/' + userId + '/' + id)
      .map(res => res.json())
  }

  startFlow(mail?: any) {
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
      if (mail.savedId) {
        formData.append('saved_id', mail.savedId)
      }else{
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

  selectFlow() {

  }
}
