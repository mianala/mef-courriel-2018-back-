import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  url = 'http://localhost:3000/api/users';
  options = new RequestOptions({withCredentials: true});

  constructor(private http: Http) {
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
    return this.http.post(this.url + '/user', {}, this.options)
      .map(res => res.json());
  }

  login(id: string, password: string) {
    this.http.post(
      this.url + '/user',
      {
        id: id,
        password: password
      }, this.options)
      .map(res => res.json())
      .subscribe(user => {

      })
  }

}
