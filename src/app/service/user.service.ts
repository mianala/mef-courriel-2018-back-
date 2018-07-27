import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {GlobalService} from './global.service';
import {NotificationService} from './notification.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {EnvService} from './env.service';
import {XhrService} from './xhr.service';

@Injectable()
export class UserService {
  url: string;
  options = new RequestOptions({withCredentials: true});
  user = new BehaviorSubject({});
  connected = new BehaviorSubject(false);
  usernames = new BehaviorSubject([]);

  constructor(private http: Http,
              private route: Router,
              private global: GlobalService,
              private notification: NotificationService,
              private xhr: XhrService) {
    this.url = EnvService.ip() + '/api/users';


    if (localStorage.getItem('user')) {
      console.log('getting user from local storage')
      this.user.next(JSON.parse(localStorage.getItem('user')))
    } else {
      console.log('connecting to get user')

      // de redirect to login
      this.http.post(this.url + '/user', {type: 'user'}, this.options)
        .map(res => res.json())
        .subscribe(user => {

          if (!user['id']) {
            this.route.navigateByUrl('/public')
            return
          }

          this.user.next(user)
        })
    }

    this.user.subscribe(user => {
      if (user['id']) {
        this.connected.next(true)
      } else {
        this.connected.next(false)
      }
    })
  }


  login(id: string, password: string, next) {
    this.http
      .post(
        this.url + '/user',
        {
          id: id,
          password: password
        }, this.options)
      .map(res => res.json())
      .subscribe(user => {
        next()

        if (user.error) {
          this.notification.print(user.error)
          return
        }

        this.user.next(user)

      })
  }

  updateLogin(credentials, next) {

    // de redirect to login
    this.http.post(this.url + '/update', credentials, this.options)
      .subscribe(() => {
        next()
      })
  }


  updateAvatar(file, next) {
    if (this.user.getValue()['id']) {
      const formData: any = new FormData();
      formData.append('user_id', this.user.getValue()['id']);
      formData.append('avatar', file, file.name)
      this.xhr.promise(this.url + '/avatar', formData, () => {
        next()
      })
    } else {
      console.log('user not connected')
    }
  }

  getUsers() {
    return this.http.get(this.url, this.options)
      .map(res => res.json())
  }
  getUsernames() {
    this.http.get(this.url+'/usernames', this.options)
      .map(res => res.json())
      .subscribe(usernames => {
        this.usernames.next(usernames)
      })
  }

  getUsersByEntity(entity) {
    return this.http.get(this.url + '/entity/' + entity, this.options)
      .map(res => res.json())
  }

  getUser(id: number) {
    return this.http.get(this.url + '/' + id, this.options)
      .map(res => res.json())
  }

  logout() {
    console.log('logging out');
    localStorage.clear();
    this.http.post(this.url + '/user', {type: 'logout'}, this.options)
      .map(res => res.json()).subscribe(data => {
      this.user.next({});
      this.notification.loggedOut();
      this.route.navigateByUrl('/public')
    });
  }
}
