import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { NotificationService } from './notification.service';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { EnvService } from "./env.service";
import { XhrService } from "./xhr.service";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ThreadService {
  url: string;
  user;

  project_threads = new BehaviorSubject([]);


  constructor(private http: HttpClient,
    private xhr: XhrService,
    private userService: UserService,
    private notification: NotificationService) {
    this
      .url = EnvService.ip() + '/api/threads';


    this.userService.user.subscribe(user => {
      if (user['id']) {
        this.user = user
      }
    })
  }


  getProjectThreads(id) {
    // console.log('getting the project threads');
    this.http.get<any>(this.url + '/' + id)
      .subscribe(project_threads => {
        project_threads.sort(function (b, a) {
          const c = a.id;
          const d = b.id;
          return c - d;
        });

        // console.log('got the project threads');


        if (this.project_threads.getValue() == project_threads) {
          return false
        }
        this.project_threads.next(project_threads)
      })
  }

  dispatch(thread, next) {
    if (this.user['id']) {
      const formData: any = new FormData();
      console.log(thread)
      formData.append('receivers', thread.receivers);
      formData.append('receiver', thread.receiver);
      formData.append('sender_entity_id', this.user.entity_id);
      formData.append('project_id', thread.project.id);
      formData.append('user_id', this.user.id);
      formData.append('content', thread.content);

      for (let i = 0; i < thread.files.length; i++) {
        formData.append('files', thread.files[i], thread.files[i].name)
      }

      this.xhr.promise(this.url, formData, () => {
        next()
      })
    }
  }

}
