import {Injectable} from '@angular/core';
import {GlobalService} from './global.service';
import {Http} from '@angular/http';
import {NotificationService} from './notification.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {UserService} from './user.service';
import {EnvService} from "./env.service";
import {XhrService} from "./xhr.service";

@Injectable()
export class ThreadService {
  url: string;
  user;

  project_threads = new BehaviorSubject([]);


  constructor(private http: Http,
              private xhr:XhrService,
              private userService: UserService,
              private notification: NotificationService) {
    this
      .url = EnvService.ip() + '/api/threads';


    this.user = this.userService.user.subscribe(user => {
      if (user['id']) {
        this.user = user
      }
    })
  }


  getProjectThreads(id) {
    console.log('getting the project threads');


    this.http.get(this.url + '/' + id)
      .map(res => res.json()).subscribe(project_threads => {
      project_threads.sort(function (b, a) {
        const c = a.id;
        const d = b.id;
        return c - d;
      });

      console.log('got the project threads');


      if(this.project_threads.getValue() == project_threads){
        return false
      }
      this.project_threads.next(project_threads)
    })
  }

  dispatch(thread,next) {

      const formData: any = new FormData();
      formData.append('receivers', thread.receivers);
      formData.append('sender_entity_id', this.user.entity_id);
      formData.append('project_id', thread.project.id);
      formData.append('user_id', this.user.id);
      formData.append('content', thread.content);
      formData.append('direction', 1);

      for (let i = 0; i < thread.files.length; i++) {
        formData.append('files', thread.files[i], thread.files[i].name)
      }

      this.xhr.promise(this.url,formData,()=>{
        next()
      })
  }


}
