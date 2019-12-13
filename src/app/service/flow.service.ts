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

  // filtered and searched
  filtered_flows = new BehaviorSubject([]);

  // searched flows
  searched_flows = new BehaviorSubject([]);
  searched_sent_flows = new BehaviorSubject([]);
  searched_received_flows = new BehaviorSubject([]);


  sent_flows = new BehaviorSubject([]);
  received_flows = new BehaviorSubject([]);
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
    private filterService: FilterService,
    private projectService: ProjectService,
    private userService: UserService, private entityService: EntityService,
    private xhr: XhrService) {
    this
      .url = EnvService.ip() + '/api/flows';
    this
      .user = this.userService.user.getValue();

    this.all_flows.subscribe(fs => {
      if (!fs) {
        return
      }
      if (!fs.length) {
        return
      }

      this.refreshFlows(fs)
    })

    // update new and sent flows from filter
    this.filtered_flows.subscribe(fs => {
      this.refreshFlows(fs)
    })

    // update received and sent flows from search
    this.searched_flows.subscribe(fs => {
    this.searched_sent_flows.next(fs.filter(flow => {
        return flow.sender_entity_id == this.entity.id
      }))
      
      this.searched_received_flows.next(fs.filter(flow => {
        return flow.sender_entity_id !== this.entity.id
      }))
    })

    this.filterService.query.subscribe(query => {
      // filtered flows -> searched flows
      this.search()
    })

    this.filterService.filters.subscribe(filters => {
      // filtered flows -> searched flows
      this.filterFlows(filters)
    })

    this.entityService.entity.subscribe(e => {
      if (!e) { return }
      if (!e['id']) { return }
      this.entity = e
      this.getFlows()
    })
  }

  search() {
    // for now from all flows
    this.searched_flows.next(FilterService.searchFlow(this.all_flows.getValue(), this.filterService.query.getValue()))
  }

  filterFlows(filter) {
    console.log(filter)
    this.filtered_flows.next(FilterService.filterFlows(this.all_flows.getValue(), filter))
  }

  refreshFlows(fs) {
    this.new_flows.next(fs.filter(flow => {
      return FilterService.newFlow(flow, this.entity)
    }))
    this.sent_flows.next(fs.filter(flow => {
      return FilterService.sentFlow(flow, this.entity)
    }))
    this.received_flows.next(fs.filter(flow => {
      return FilterService.receivedFlow(flow, this.entity)
    }))
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

  getFlows() {

    this.http.get<any>(this.url + '/latest/' + this.entity['id'])
      .subscribe(flows => {
        this.all_flows.next(flows)
        this.getAllFlows()
      })

  }

  getAllFlows() {
    // console.log('getting all flows');

    // console.log('loading all flows');
    this.http.get<any>(this.url + '/all/' + this.entity['id'])
      .subscribe(flows => {
        flows.sort(GlobalService.sortByDate);
        this.all_flows.next(flows)
      })
  }

  getProjectFlows(id) {
    this.http.get<any>(this.url + '/project/' + id)

      .subscribe(flows => {
        console.log(flows)
        flows.sort(GlobalService.sortByDate);
        if (this.project_flows.getValue() == flows) {
          return false
        }
        this.project_flows.next(flows)
      })
  }

  getFlowFiles(thread_id, next) {
    this.http.get(EnvService.ip() + '/api/files/thread/' + thread_id).subscribe((files) => {
      next(files)
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

  addSuivi(flow, next) {
    const formData: any = new FormData();
    formData.append('project_id', flow.project_id);
    formData.append('user_id', this.user.id);
    formData.append('entity_id', this.user.entity_id);
    formData.append('type_id', flow.type_id);
    formData.append('content', flow.content);
    formData.append('objet', flow.objet);
    formData.append('sender', flow.sender);

    for (let i = 0; i < flow.files.length; i++) {
      formData.append('files', flow.files[i], flow.files[i].name)
    }

    this.xhr.promise(this.url + '/suivi', formData, () => {
      next()
    })
  }
}
