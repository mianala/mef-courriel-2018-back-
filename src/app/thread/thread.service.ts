import {Injectable} from '@angular/core';
import {GlobalService} from "../global.service";
import {Http} from "@angular/http";
import {NotificationService} from "../notification.service";

@Injectable()
export class ThreadService {
  url: string;

  constructor(private http: Http,
              private notification: NotificationService, private global: GlobalService) {
    this
      .url = global.ip() + '/api/threads';
  }

  dispatch(thread) {

    return new Promise((resolve, reject) => {
      const formData: any = new FormData()
      const xhr = new XMLHttpRequest()

      formData.append('n_arrive', thread.n_arrive)
      formData.append('n_arrive_dg', thread.n_arrive_dg)
      formData.append('sender', thread.sender)
      formData.append('ref', thread.ref)
      formData.append('type_id', thread.type)
      formData.append('lettre_id', thread.lettre)
      formData.append('entity_id', thread.entity_id)
      formData.append('title', thread.content)
      formData.append('content', thread.observations)
      formData.append('date', thread.date)
      formData.append('received_date', thread.received_date)

      for (let i = 0; i < thread.files.length; i++) {
        formData.append('files', thread.files[i], thread.files[i].name)
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

      xhr.open('POST', this.url, true);
      xhr.send(formData)
      this.notification.threadDispatched()
    });
  }

}
