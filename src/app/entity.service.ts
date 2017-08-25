import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {GlobalService} from "./global.service";

@Injectable()
export class EntityService {
  url: string

  constructor(private http: Http, private global: GlobalService) {
    this.url = global.ip() + '/api/entities/';
  }

  getDirections() {
    return this.http.get(this.url + '/directions')
      .map(res => res.json())
  }

  getEntities() {
    return this.http.get(this.url)
      .map(res => res.json())
  }

  getServices() {
    return this.http.get(this.url + '/services')
      .map(res => res.json())
  }

}
