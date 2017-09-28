import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {GlobalService} from './global.service';
import {NotificationService} from './notification.service';

@Injectable()
export class UserService {
  url: string
  options = new RequestOptions({withCredentials: true});

  constructor(private http: Http,
              private route: Router,
              private notification: NotificationService,
              private global: GlobalService) {
    this.url = global.ip() + '/api/users';
  }

  redirectIfConnected() {
    const route = this.route
    this.isConnected(function (result) {
      console.log('log :' + result)
      if (result) {
        route.navigateByUrl('/courriels')
      } else {
        route.navigateByUrl('/public/connexion')
      }
    })
  }

  isConnected(next) {
    return this.http.post(this.url + '/user', {type: 'check'}, this.options)
      .map(data => data.json())
      .subscribe(result => {
        if (result === '0') {
          next(false)
        } else {
          next(true)
        }
      })
  }

  saveUser(user?: any) {


    this.post(user).then((result) => {
      console.log(result)
      this.notification.user_saved()
      this.route.navigateByUrl('/public')

    }, (error) => {
      console.log(error)
    })

  }

  post(user: any) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData()
      const xhr = new XMLHttpRequest()
      formData.append('entityId', user.entity.id)
      formData.append('im', user.im)
      formData.append('username', user.username)
      formData.append('functionId', user.functionId)
      formData.append('name', user.name)
      formData.append('fullname', user.fullname)
      formData.append('title', user.functionTitle)
      formData.append('email', user.email)
      formData.append('password', user.password)
      formData.append('avatar', user.avatar, user.avatar.name)

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
      // this.notification.user()
    });
  }

  getUsers() {
    return this.http.get(this.url, this.options)
      .map(res => res.json())
  }

  getUsersByEntity(entity) {
    return this.http.get(this.url + '/entity/' + entity, this.options)
      .map(res => res.json())
  }

  getUser(id: number) {
    return this.http.get(this.url + '/' + id, this.options)
      .map(res => res.json())
  }

  getActiveUser() {
    return this.http.post(this.url + '/user', {type: 'user'}, this.options)
      .map(res => res.json());
  }

  logout() {
    return this.http.post(this.url + '/user', {type: 'logout'}, this.options)
      .map(res => res.json());
  }

  login(id: string, password: string) {
    return this.http.post(
      this.url + '/user',
      {
        id: id,
        password: password
      }, this.options)
      .map(res => res.json())
  }

}
