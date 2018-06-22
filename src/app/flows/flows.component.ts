import {Component, Input, OnInit} from '@angular/core';
import {FlowService} from '../service/flow.service';
import {EntityService} from '../service/entity.service';
import {DispatchComponent} from '../projects/dialog/dispatch/dispatch.component';
import {MatDialog} from '@angular/material';
import {ProjectService} from '../service/project.service';
import {ReplyComponent} from '../dialog/reply/reply.component';
import {ShareComponent} from '../dialog/share/share.component';
import {DecommissionComponent} from '../dialog/decommission/decommission.component';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {GlobalService} from '../service/global.service';
import {FilterService} from '../service/filter.service';

@Component({
  selector: 'flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.scss']
})
export class FlowsComponent implements OnInit {
  @Input() flows;
  @Input() visibility: boolean;
  user;
  relatives = [];

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

    this.entityService.relativeEntities.subscribe(entities => {
      this.relatives = entities
    })
  }

  ngOnInit() {

  }

  treated(flow) {
    return FilterService.treatedFlow(flow)
  }

  title_label(flow) {
    if (FilterService.isShipped(flow)) {
      return 'au ' + flow.destination
    } else if (FilterService.isImported(flow)) {
      return flow.destination
    } else if (FilterService.isSent(flow, this.user)) {
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
    if (FilterService.isSent(flow, this.user)) {
      return ''
    }
  }

  dispatchable(flow) {
    return this.entityService.downEntities.getValue().length > 0
  }

  sameDay(flow) {
    return GlobalService.sameDay(new Date(flow.date), new Date())
  }

  shareable(flow) {
    return false
    // return this.relatives.length && flow.sender_entity.length < this.user.entity
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
    return FilterService.received(flow, this.user)
  }

  submitable(id) {
    return false
  }

  view(flow) {
    this.projectService.setProjectFromId(flow.project_id);
    this.router.navigateByUrl('/courriels/courriel')
  }

  share(flow) {
    this.flowService.setFlow(flow.id);
    this.dialog.open(ShareComponent);
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
