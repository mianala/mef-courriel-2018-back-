import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {NotificationService} from "./notification.service";


@Injectable()
export class SavedService {

  url = 'http://localhost:3000/api/saveds';

  constructor(private http: Http, private notification: NotificationService) {

  }

  getSaveds(userId) {
    return this.http.get(this.url + '/user/' + userId)
      .map(res => res.json())
  }


  getSaved(id: number) {
    return this.http.get(this.url + '/' + id)
      .map(res => res.json())
  }

  save(saved: any) {
    this.post(saved).then((result) => {
      console.log(result)
    }, (error) => {
      console.log(error)
    })

  }

  post(saved: any) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData()
      const xhr = new XMLHttpRequest()

      formData.append('ref', saved.ref)
      formData.append('n_arrive', saved.n_arrive)
      formData.append('n_arrive_dg', saved.n_arrive_dg)
      formData.append('date', saved.date)
      formData.append('received_date', saved.received_date)
      formData.append('title', saved.title)
      formData.append('content', saved.content)
      formData.append('user_id', saved.user.id)
      formData.append('sender', saved.sender)

      for (let i = 0; i < saved.files.length; i++) {
        formData.append('files', saved.files[i], saved.files[i].name)
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
      this.notification.emailSaved()
    });
  }
}

