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

    this.latest_flows.subscribe(fs => {
      this.new_flows.next(fs.filter(flow => {
        return FilterService.newFlow(flow, this.entity)
      }))
      this.sent_flows.next(fs.filter(flow => {
        return FilterService.sentFlow(flow, this.entity)
      }))
      this.treated_flows.next(fs.filter(flow => {
        return FilterService.treatedFlow(flow, this.entity)
      }))
    })

    this.userService.user.subscribe(user => {

      if (user['id']) {
        this.user = user;
      }
    });

    this.entityService.entity.subscribe(e => {
      console.log(e)
      if (!e) { return }
      if (e['id']) {
        this.entity = e
        this.getLatestFlows()
      }
    })
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
    if (!this.entity) { return }
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
