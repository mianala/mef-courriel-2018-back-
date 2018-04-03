import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {GlobalService} from "./global.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {UserService} from "./user.service";

@Injectable()
export class EntityService {
  url: string
  downEntities = new BehaviorSubject([])
  relativeEntities = new BehaviorSubject([])
  entities = new BehaviorSubject([])
  entity = new BehaviorSubject({})
  dgbEntities = new BehaviorSubject([])
  user

  constructor(private http: Http,
              private userService: UserService,
              private global: GlobalService) {
    this.url = global.ip() + '/api/entities';

    this.http.get(this.url)
      .map(res => res.json()).subscribe(data => {
      this.entities.next(data)
    })

    this.user = this.userService.user.subscribe(user => {
      if (user['id']) {

        this.user = user

        const entity = user['entity']
        entity.numero = entity.n_depart + '-2018/'+ entity.header
        this.entity.next(entity)

        this.getDownEntities()
        this.getRelativeEntities()
      }
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

  getDownEntities() {
    console.log('getting down entity ' + this.user['entity'].entity)
    this.http.get(this.url + '/down/' + this.user['entity'].entity + '-')
      .map(res => res.json()).subscribe(entities => {
      this.downEntities.next(entities)
    })
  }

  getRelativeEntities() {
    console.log('getting down entity ' + this.user['entity'].entity)

    //sends 1-3-1 to the api
    this.http.get(this.url + '/relative/' + this.user['entity'].entity)
      .map(res => res.json()).subscribe(entities => {
      this.relativeEntities.next(entities)
    })
  }

  getServices() {
    return this.http.get(this.url + '/services')
      .map(res => res.json())
  }

}
