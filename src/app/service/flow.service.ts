import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { NotificationService } from './notification.service';
import { GlobalService } from './global.service';
import { BehaviorSubject } from 'rxjs';
import { ProjectService } from './project.service';
import { EnvService } from './env.service';
import { XhrService } from './xhr.service';
import { FilterService } from './filter.service';
import { EntityService } from './entity.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FlowService {
  url: string;

  //in boite
  latest_flows = new BehaviorSubject([]);
  all_flows = new BehaviorSubject([]);
  new_flows = new BehaviorSubject([]);
  flows = new BehaviorSubject([]);
  sent_flows = new BehaviorSubject([]);
  // in traité
  treated_flows = new BehaviorSubject([]);
  // in expediés
  shipped_flows = new BehaviorSubject([]);
  //imported
  returned_flows = new BehaviorSubject([]);

  project_flows = new BehaviorSubject([]);

  flow = new BehaviorSubject({});
  be = new BehaviorSubject({});
  shipped_flow = new BehaviorSubject({});
  answerData = new BehaviorSubject({});
  user;
  entity;

  constructor(private http: HttpClient,
    private notification: NotificationService,
    private projectService: ProjectService,
    private userService: UserService, private entityService: EntityService,
    private xhr: XhrService) {
    this
      .url = EnvService.ip() + '/api/flows';
    this
      .user = this.userService.user.getValue();

    this.entityService.entity.subscribe(entity => {
      if (!entity) { return }
      if (entity['id']) {
        this.entity = entity
        this.getAllFlows();

        this.projectService.project.subscribe(project => {
          if (project['id']) {
            this.getProjectFlows(project.id)
          }
        });
      }
    })

    this.userService.user.subscribe(user => {

      if (user['id']) {
        this.user = user;
      }
    });
  }


  update() {
    this.http.get<any>(this.url + '/user/' + this.user['id'])
      .subscribe(flows => {
        {
          flows.sort(GlobalService.sortByDate);
          this.flows.next(flows)
        }
      })
  }

  setFlow(flow) {
    this.flow.next(flow)
  }

  getAllFlows() {
    // console.log('loading all flows');
    this.http.get<any>(this.url + '/all/' + this.entity['id'])
      .subscribe(flows => {
        flows.sort(GlobalService.sortByDate);
        this.all_flows.next(flows)
      })
  }

  getNewFlows() {
    // console.log('loading all flows');
    this.http.get<any>(this.url + '/new/' + this.entity['id'])
      .subscribe(flows => {
        flows.sort(GlobalService.sortByDate);
        this.new_flows.next(flows)
      })
  }

  getLatestFlows() {
    // console.log('loading all flows');
    this.http.get<any>(this.url + '/latest/' + this.entity['id'])
      .subscribe(flows => {
        flows.sort(GlobalService.sortByDate);
        this.latest_flows.next(flows)
      })
  }

  getSentFlows(flows) {
    // console.log(flows)
    let ps = FilterService.sentFlow(flows, this.entity);

    if (this.sent_flows.getValue() == ps) {
      return false
    }
    this.sent_flows.next(ps)
  }

  getTreatedFlows(flows) {
    let ps = FilterService.treatedFlows(flows, this.entity);

    if (this.treated_flows.getValue() == ps) {
      return false
    }
    this.treated_flows.next(ps)
  }


  getProjectFlows(id) {
    this.http.get<any>(this.url + '/project/' + id)
      
      .subscribe(flows => {
        flows.sort(GlobalService.sortByDate);
        if (this.project_flows.getValue() == flows) {
          return false
        }
        this.project_flows.next(flows)
      })
  }

  decommission(flow, next) {
    const formData: any = new FormData();
    formData.append('flow_id', this.flow.getValue()['id']);
    formData.append('sender_entity_id', this.user.entity['id']);
    formData.append('entity_id', flow.entity['id']);
    formData.append('reason', flow.content);
    formData.append('user_id', this.user.id);

    this.xhr.promise(this.url + '/decommission', formData, () => {
      next()
    })
  }
}
