import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { EnvService } from './env.service';
import { FilterService } from './filter.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EntityService {
  url: string;

  relativeEntities = new BehaviorSubject([]);

  entities = new BehaviorSubject([]);
  upEntities = new BehaviorSubject({});
  downEntities = new BehaviorSubject([]);

  entity = new BehaviorSubject({});
  user;
  last_n_project = new BehaviorSubject(0)

  constructor(private http: HttpClient,
    private userService: UserService) {
    this.url = EnvService.ip() + '/api/entities';



    this.getEntities();
    // filtering entitites

    this.entity.subscribe(entity => {
      if (!entity) { return }
      if (entity['entity']) {
        this.filterEntities(this.entities.getValue(), entity)
      }
    })

    this.entities.subscribe(entities => {
      if (entities.length > 0) {
        this.userService.user.subscribe(user => {
          if (user['id']) {
            this.user = user;
            this.getUserEntity(user['entity_id']);
          }
        });
      }
    })
  }




  getUserEntity(entity_id) {
    const entity = this.entities.getValue().filter(e => {
      return e.id == entity_id
    })
    entity['numero'] = '## - 2019/' + entity['header'];
    // console.log('setting entity');
    this.entity.next(entity[0]);
    // get relative entities
  }

  filterEntities(entities, entity) {
    // console.log('filtering entities');

    this.downEntities.next(FilterService.fitlerDownEntities(entities, entity))
    this.upEntities.next(FilterService.fitlerUpEntities(entities, entity))
    this.relativeEntities.next(FilterService.fitlerRelativeEntities(entities, entity))
  }

  getEntities() {
    if (localStorage.getItem('entities')) {
      this.entities.next(JSON.parse(localStorage.getItem('entities')))
    } else {
      this.http.get<any>(this.url)
        .subscribe(entities => {


          entities.sort(function (b, a) {
            const c = a.entity;
            const d = b.entity;
            return c - d;
          });

          this.entities.next(entities)
          localStorage.setItem('entities', JSON.stringify(entities))
        })
    }
  }

}
