import {Injectable} from '@angular/core';
import {GlobalService} from '../global.service';
import {Http} from '@angular/http';
import {NotificationService} from '../notification.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {UserService} from '../user.service';
import {ProjectService} from '../projects/project.service';

@Injectable()
export class ThreadService {
  url: string;
  user

  projectThreads = new BehaviorSubject([])
  threads = new BehaviorSubject([])
  thread = new BehaviorSubject([])


  constructor(private http: Http,
              private userService: UserService,
              private notification: NotificationService, private global: GlobalService) {
    this
      .url = global.ip() + '/api/threads';

    this.user = this.userService.user.subscribe(user => {
      this.user = user
      this.getThreads()
    })
  }

  getThreads() {

    console.log('loading threads')

    this.http.get(this.url)
      .map(res => res.json()).subscribe(threads => {

      threads.sort(function (b, a) {
        const c = a.id;
        const d = b.id;
        return c - d;
      });


      this.threads.next(threads)
    })
  }

  getProjectThreads(id) {


    this.http.get(this.url + '/' + id)
      .map(res => res.json()).subscribe(threads => {
      threads.sort(function (b, a) {
        const c = a.id;
        const d = b.id;
        return c - d;
      });
      this.projectThreads.next(threads)
    })
  }

  setThread(id: number) {
    console.log('setting thread ' + id)
    this.http.get(this.url + '/' + id)
      .map(res => res.json()).subscribe(thread => {
      console.log(thread)
      this.thread.next(thread)
      localStorage.setItem('thread', JSON.stringify(thread))
    })
  }

  dispatch(thread) {

    return new Promise((resolve, reject) => {
      const formData: any = new FormData()
      const xhr = new XMLHttpRequest()

      formData.append('receivers', thread.receivers)
      formData.append('entity_id', 32)
      formData.append('sender_entity_id', 31)
      formData.append('project_id', thread.project.id)
      formData.append('content', thread.content)

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
