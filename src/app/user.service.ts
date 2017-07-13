import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  getUsers() {
    return this.http.get('http://localhost:3000/users')
      .map(res => res.json())
  }

  getUser(id: number) {
    return this.http.get('http://localhost:3000/users' + '/' + id)
      .map(res => res.json())
  }

  getActiveUser() {
    return this.getUser(2);
  }

}
