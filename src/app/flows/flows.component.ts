import {Component, Input, OnInit} from '@angular/core';
import {FlowService} from '../service/flow.service';
import {EntityService} from '../service/entity.service';
import {DispatchComponent} from '../projects/dialog/dispatch/dispatch.component';
import {MatDialog} from '@angular/material';
import {ProjectService} from '../service/project.service';
import {ReplyComponent} from '../dialog/reply/reply.component';
import {ForwardComponent} from '../dialog/forward/forward.component';
import {DecommissionComponent} from '../dialog/decommission/decommission.component';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {GlobalService} from '../service/global.service';
import {FilterService} from '../service/filter.service';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.scss']
})
export class FlowsComponent implements OnInit {
  @Input() flows;
  @Input() visibility: boolean;
  user;
  entity;
  relatives = [];


  // MatPaginator Inputs
  length = 0;

  paginator = GlobalService.paginator
  paginate = GlobalService.paginate
  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent();


  constructor(public router: Router,
              public flowService: FlowService,
              public userService: UserService,
              public entityService: EntityService,
              public filter: FilterService,
              public dialog: MatDialog,
              public projectService: ProjectService) {
    this.visibility = true;
    this.userService.user.subscribe(user => {
      this.user = user
    });

    this.entityService.entity.subscribe(entity => {
      this.entity = entity
    })

    this.entityService.relativeEntities.subscribe(entities => {
      this.relatives = entities
    })

    this.pageEvent.pageIndex = 0
    this.pageEvent.pageSize = this.paginator.pageSize

  }

  ngOnInit() {
    this.filter.query.next('')
  }

  treated(flow) {
    return FilterService.treatedFlow(flow, this.entity)
  }

  title_label(flow) {
    if (FilterService.isShipped(flow)) {
      return 'au ' + flow.destination
    } else if (FilterService.isImported(flow)) {
      return flow.destination
    } else if (FilterService.isSent(flow, this.entity)) {
      return 'à ' + flow.entity_label
    } else {
      return flow.sender_entity_label
    }
  }

  decommissionable(flow) {
    return false
    // return flow.direction == 1;
  }

  designateur(flow) {
    if (FilterService.isSent(flow, this.entity)) {
      return ''
    }
  }

  dispatchable(flow) {
    return this.entityService.downEntities.getValue().length > 0
  }

  sameDay(flow) {
    return GlobalService.sameDay(new Date(flow.date), new Date())
  }

  forwardable(flow) {
    return this.entityService.relativeEntities.getValue().length
    // && FilterService.received(flow,this.user) && flow.sender_entity.length > flow.entity.length
  }

  viewable(flow) {
    return true
  }

  treatable(flow) {
    return flow.sender_entity_id != this.user.entity_id && flow.status_id != 1;
  }

  treat(flow) {
    this.flowService.treat(flow.id)
  }

  received(flow) {
    return FilterService.received(flow, this.entity)
  }

  submitable(id) {
    return false
  }

  view(flow) {
    this.projectService.setProjectFromId(flow.project_id);
    this.router.navigateByUrl('/courriels/courriel')
  }

  forward(flow) {
    this.flowService.flow.next(flow);
    this.dialog.open(ForwardComponent);
  }

  decommission(flow) {
    this.flowService.setFlow(flow.id);
    this.dialog.open(DecommissionComponent);
  }

  submit(flow) {
    this.flowService.setFlow(flow.id)
  }

  answer(flow) {
    this.flowService.answerData.next({
      flow_id: flow.id,
      entity_id: flow.sender_entity_id
    });

    this.dialog.open(ReplyComponent);
  }

  dispatch(flow) {
    console.log(flow)
    this.projectService.setProjectFromId(flow.project_id);
    this.dialog.open(DispatchComponent);
  }
}
