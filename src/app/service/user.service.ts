
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { Router } from '@angular/router';
import { GlobalService } from './global.service';
import { NotificationService } from './notification.service';
import { BehaviorSubject } from 'rxjs';
import { EnvService } from './env.service';
import { XhrService } from './xhr.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  url: string;
  options = new RequestOptions({ withCredentials: true });
  user = new BehaviorSubject({});
  connected = new BehaviorSubject(false);
  usernames = new BehaviorSubject([]);

  constructor(private http: HttpClient,
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
      this.http.post(this.url + '/user', { type: 'user' })
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
      .post<any>(
        this.url + '/user',
        {
          id: id,
          password: password
        }).subscribe(user => {

          console.log(user)
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
    this.http.post(this.url + '/update', credentials)
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
    return this.http.get(this.url)
  }
  getUsernames() {
    this.http.get<any>(this.url + '/usernames')
      .subscribe(usernames => {
        this.usernames.next(usernames)
      })
  }

  getUsersByEntity(entity) {
    return this.http.get(this.url + '/entity/' + entity)
  }

  getUser(id: number) {
    return this.http.get(this.url + '/' + id)
  }

  logout() {
    console.log('logging out');
    localStorage.clear();
    this.http.post(this.url + '/user', { type: 'logout' }).subscribe(data => {
      this.user.next({});
      this.notification.loggedOut();
      this.route.navigateByUrl('/public')
    });
  }
}
