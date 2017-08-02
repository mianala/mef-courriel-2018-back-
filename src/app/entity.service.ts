import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class EntityService {
  url = 'http://localhost:3000/api/entities'

  constructor(private http: Http) {
  }

  getDirections() {
    return this.http.get(this.url + '/directions')
      .map(res => res.json())
  }

  getServices() {
    return this.http.get(this.url + '/services')
      .map(res => res.json())
  }

}
