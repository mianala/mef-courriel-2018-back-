import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {GlobalService} from "./global.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class EntityService {
  url: string
  entities = new BehaviorSubject([])
  dgbEntities = new BehaviorSubject([])

  constructor(private http: Http, private global: GlobalService) {
    this.url = global.ip() + '/api/entities/';

    this.http.get(this.url)
      .map(res => res.json()).subscribe(data => {
      this.entities.next(data)
    })

    this.http.get(this.url + '/dgb')
      .map(res => res.json()).subscribe(data => {
      this.dgbEntities.next(data)
    })
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
