import {Component, Input, OnInit} from '@angular/core';
import {FlowService} from "../service/flow.service";
import {EntityService} from "../service/entity.service";
import {DispatchComponent} from "../projects/dialog/dispatch/dispatch.component";
import {MatDialog} from "@angular/material";
import {ThreadService} from "../service/thread.service";
import {ProjectService} from "../service/project.service";
import {AnswerComponent} from "../dialog/answer/answer.component";
import {ExportComponent} from "../dialog/export/export.component";
import {ShareComponent} from "../dialog/share/share.component";
import {DecommissionComponent} from "../dialog/decommission/decommission.component";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";

@Component({
  selector: 'flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.scss']
})
export class FlowsComponent implements OnInit {
  @Input() flows
  @Input() visibility: boolean
  user

  constructor(public router: Router,
              public flowService: FlowService,
              public userService: UserService,
              public entityService: EntityService,
              public dialog: MatDialog,
              public projectService: ProjectService) {
    this.visibility = true

    this.userService.user.subscribe(user => {
      this.user = user
    })
  }

  ngOnInit() {
  }

  decommissionable(flow) {
    if (flow.direction != 1) {
      return false
    }
    return true
  }

  shareable(flow) {
    return true
  }

  shippable(flow) {
    if (flow.direction != 2) {
      return false
    }
    return true
  }

  viewable(flow) {
    return true
  }

  answerable(flow) {
    if(flow.sender_entity_id == this.user.entity_id){
      return false
    }
    return true
  }

  treatable(flow) {
    if(flow.sender_entity_id == this.user.entity_id){
      return false
    }
    return true
  }


  sendable(id) {
    return true
  }

  view(id) {
    this.projectService.setProject(id)
    this.router.navigateByUrl('/courriels/courriel')
  }

  ship(id) {
    this.flowService.setFlow(id)
    this.dialog.open(ExportComponent);
  }

  share(id) {
    this.flowService.setFlow(id)
    this.dialog.open(ShareComponent);
  }

  decommission(id) {
    this.flowService.setFlow(id)
    this.dialog.open(DecommissionComponent);
  }

  send(id) {
    this.flowService.setFlow(id)
  }

  answer(id, entity_id) {
    this.flowService.answerData.next({
      flow_id: id,
      entity_id: entity_id
    })

    this.dialog.open(AnswerComponent);
  }

  dispatch(id) {
    this.projectService.setProject(id)
    this.dialog.open(DispatchComponent);
  }
}
