import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {GlobalService} from "./global.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {UserService} from "./user.service";
import {EnvService} from "./env.service";

@Injectable()
export class EntityService {
  url: string

  upEntity = new BehaviorSubject({})
  downEntities = new BehaviorSubject([])
  relativeEntities = new BehaviorSubject([])

  entities = new BehaviorSubject([])
  entity = new BehaviorSubject({})
  dgbEntities = new BehaviorSubject([])
  user

  constructor(private http: Http,
              private userService: UserService) {
    this.url = EnvService.ip() + '/api/entities';


    this.getEntities()
    this.user = this.userService.user.subscribe(user => {
      if (user['id']) {

        this.user = user

        const entity = user['entity']
        entity.numero = (entity.n_depart+1) + '-2018/'+ entity.header
        this.entity.next(entity)


        this.getDownEntities()
        this.getUpEntity()
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
    this.http.get(this.url)
      .map(res => res.json()).subscribe(entities => {


      entities.sort(function (b, a) {
        const c = a.entity;
        const d = b.entity;
        return c - d;
      });

        this.entities.next(entities)
      })
  }

  getDownEntities() {
    console.log('getting down entities ' + this.user['entity'].entity)
    this.http.get(this.url + '/down/' + this.user['entity'].entity + '-')
      .map(res => res.json()).subscribe(entities => {


      entities.sort(function (b, a) {
        const c = a.entity;
        const d = b.entity;
        return c - d;
      });

      this.downEntities.next(entities)
    })
  }

  getUpEntity() {
    console.log('getting up entity ' + this.user['entity'].entity)
    this.http.get(this.url + '/up/' + this.user['entity'].entity )
      .map(res => res.json()).subscribe(entity => {
      this.upEntity.next(entity[0])
    })
  }

  getRelativeEntities() {
    console.log('getting relative entities' + this.user['entity'].entity)

    //sends 1-3-1 to the api
    this.http.get(this.url + '/relative/' + this.user['entity'].entity)
      .map(res => res.json()).subscribe(entities => {

      entities.sort(function (b, a) {
        const c = a.entity;
        const d = b.entity;
        return c - d;
      });

      this.relativeEntities.next(entities)
    })
  }

  getServices() {
    return this.http.get(this.url + '/services')
      .map(res => res.json())
  }

}
