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
  saved = new BehaviorSubject([])
  user

  constructor(private global: GlobalService,
              private userService: UserService,
              private http: Http,
              private notification: NotificationService) {
    this.url = global.ip() + '/api/saveds';
    this.user = this.userService.user.getValue()
    console.log('initializing saveds')
    this.getSaveds()
  }

  getSaveds() {
    console.log('loading saveds')

      this.http.get(this.url + '/user/' + this.user.id)
        .map(res => res.json()).subscribe(saveds => {

        saveds.sort(function (b, a) {
          const c = a.id;
          const d = b.id;
          return c - d;
        });
        this.saveds.next(saveds)
    })
  }

  reload() {
    // todo if nothing in the actual saved

    console.log('reloading saved')
    const saved = localStorage.getItem('saved')
    if (saved) {
      this.saved.next(JSON.parse(saved))
    }
  }

  setSaved(id: number) {
    console.log('setting saved ' + id)
    this.http.get(this.url + '/' + id)
      .map(res => res.json()).subscribe(saved => {
      console.log(saved)
      this.saved.next(saved)
      localStorage.setItem('saved', JSON.stringify(saved))
    })
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

  remove(id: number) {
    this.http.delete(this.url + '/' + id + '/' + this.user.id).subscribe(data => {
      console.log('saved ' + id + ' removed')
      console.log('updating saved list')
      this.getSaveds()
      this.notification.savedRemoved()
    })
  }

}

