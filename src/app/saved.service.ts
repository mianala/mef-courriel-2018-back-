import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {NotificationService} from './notification.service';
import {GlobalService} from './global.service';
import {UserService} from './user.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class SavedService {

  url: string;
  saveds = new BehaviorSubject([])

  constructor(private global: GlobalService,
              private userService: UserService,
              private http: Http, private notification: NotificationService) {
    this.url = global.ip() + '/api/saveds';
    console.log('initializing saveds')
    this.getSaveds()
  }

  getSaveds() {
    this.userService.userObject.subscribe(user => {

      this.http.get(this.url + '/user/' + user.id)
        .map(res => res.json()).subscribe(saveds => {

        saveds.sort(function (b, a) {
          const c = a.id;
          const d = b.id;
          return c - d;
        });
        this.saveds.next(saveds)
      })
    })
  }


  getSaved(id: number) {
    return this.http.get(this.url + '/' + id)
      .map(res => res.json())
  }

  save(saved: any) {
    this.post(saved).then((result) => {
      console.log(result)
      console.log('fetching result from the result of the post saved')
      this.getSaveds()

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
            resolve(xhr.response);
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

  removeSaved(id: number, userId: number) {
    this.http.delete(this.url + '/' + id + '/' + userId).subscribe(data => {
      console.log('saved ' + id + ' removed')
      console.log('updating saved list')
      this.getSaveds()
    })
  }

}

