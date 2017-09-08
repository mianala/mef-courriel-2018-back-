import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {NotificationService} from './notification.service';
import {UserService} from './user.service';
import {GlobalService} from './global.service';

@Injectable()
export class TransferService {
  url: string

  constructor(private http: Http,
              private notification: NotificationService, private userService: UserService, private global: GlobalService) {
    this.url = global.ip() + '/api/flows';

  }

  transferFlow(flow) {
    this.post(flow).then((result) => {
      console.log(result)
    }, (error) => {
      console.log(error)
    })

  }

  post(flow: any) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData()
      const xhr = new XMLHttpRequest()

      formData.append('flow_id', flow.flowId)
      formData.append('sender_id', flow.senderId)
      formData.append('receiver_id', flow.receiverId)

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST', this.url + '/transfer', true);
      xhr.send(formData)
      this.notification.emailSent()
    });
  }
}
