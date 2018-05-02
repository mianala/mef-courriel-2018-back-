import {Component, Input, OnInit} from '@angular/core';
import {FlowService} from "../service/flow.service";
import {EntityService} from "../service/entity.service";
import {DispatchComponent} from "../projects/dialog/dispatch/dispatch.component";
import {MatDialog} from "@angular/material";
import {ProjectService} from "../service/project.service";
import {ReplyComponent} from "../dialog/reply/reply.component";
import {ExportComponent} from "../dialog/export/export.component";
import {ShareComponent} from "../dialog/share/share.component";
import {DecommissionComponent} from "../dialog/decommission/decommission.component";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {GlobalService} from "../service/global.service";
import {FilterService} from "../service/filter.service";

@Component({
  selector: 'flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.scss']
})
export class FlowsComponent implements OnInit {
  @Input() flows;
  @Input() visibility: boolean;
  user;

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
  }

  ngOnInit() {

  }

  decommissionable(flow) {
    return false
    // return flow.direction == 1;

  }

  sameDay(flow) {
    return GlobalService.sameDay(new Date(flow.date), new Date())
  }

  shareable(flow) {
    return false
    // return true
  }

  shippable(flow) {

    return false
    // return flow.direction == 2;

  }

  viewable(flow) {
    return true
  }

  answerable(flow) {
    return flow.sender_entity_id != this.user.entity_id;

  }

  treatable(flow) {
    return flow.sender_entity_id != this.user.entity_id && flow.status_id != 1;
  }

  treat(flow) {
    this.flowService.treat(flow.id)
  }

  sent(flow) {
    return flow.sender_entity_id == this.user.entity_id
  }

  received(flow) {
    return flow.sender_entity_id != this.user.entity_id
  }

  exported(flow) {
    return flow.destination > 0
  }

  /*
  untreat(flow) {
    this.flowService.untreat(flow.id)
  }*/


  submitable(id) {

    return false
  }

  view(id) {
    this.projectService.setProject(id);
    this.router.navigateByUrl('/courriels/courriel')
  }

  ship(id) {
    this.flowService.setFlow(id);
    this.dialog.open(ExportComponent);
  }

  share(id) {
    this.flowService.setFlow(id);
    this.dialog.open(ShareComponent);
  }

  decommission(id) {
    this.flowService.setFlow(id);
    this.dialog.open(DecommissionComponent);
  }

  submit(id) {
    this.flowService.setFlow(id)
  }

  answer(id, entity_id) {
    this.flowService.answerData.next({
      flow_id: id,
      entity_id: entity_id
    });

    this.dialog.open(ReplyComponent);
  }

  dispatch(id) {
    this.projectService.setProject(id);
    this.dialog.open(DispatchComponent);
  }
}
