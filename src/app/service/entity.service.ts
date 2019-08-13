import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService } from './user.service';
import { EnvService } from './env.service';
import { FilterService } from './filter.service';

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

  constructor(private http: Http,
    private userService: UserService) {
    this.url = EnvService.ip() + '/api/entities';



    this.getEntities();

    this.user = this.userService.user.subscribe(user => {
      if (user['id']) {
        this.user = user;
        this.getUserEntity(user['entity_id']);
      }
    });

    this.entity.subscribe(entity => {
      if (!entity) { return }
      if (entity['entity']) {
        this.filterEntities(this.entities.getValue(), entity)
      }
    })
  }

  getUserEntity(entity_id) {
    const entity = this.entities.getValue().filter(e => {
      return e.id == entity_id
    })
    entity['numero'] = '## - 2019/' + entity['header'];
    this.entity.next(entity[0]);
    // get relative entities
  }

  filterEntities(entities, entity) {
    this.downEntities.next(FilterService.fitlerDownEntities(entities, entity))
    this.upEntities.next(FilterService.fitlerUpEntities(entities, entity))
    this.relativeEntities.next(FilterService.fitlerRelativeEntities(entities, entity))
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

}
