import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {GlobalService} from './global.service';

@Injectable()
export class UserService {
  url: string
  options = new RequestOptions({withCredentials: true});

  constructor(private http: Http, private route: Router, private global: GlobalService) {
    this.url = global.ip() + '/api/users';
  }

  redirectIfConnected() {
    const route = this.route
    this.isConnected(function (result) {
      console.log('log :' + result)
      if (result) {
        route.navigateByUrl('/courriels')
      } else {
        route.navigateByUrl('/public')
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
