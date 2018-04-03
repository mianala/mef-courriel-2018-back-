import {Component, Input, OnInit} from '@angular/core';
import {FlowService} from "../../flow.service";
import {EntityService} from "../../entity.service";
import {DispatchComponent} from "../../projects/dialog/dispatch/dispatch.component";
import {MatDialog} from "@angular/material";
import {ThreadService} from "../../thread/thread.service";
import {ProjectService} from "../../projects/project.service";
import {AnswerComponent} from "../../dialog/answer/answer.component";
import {ExportComponent} from "../../dialog/export/export.component";
import {ShareComponent} from "../../dialog/share/share.component";
import {DecommissionComponent} from "../../dialog/decommission/decommission.component";
import {Router} from "@angular/router";

@Component({
  selector: 'flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.scss']
})
export class FlowsComponent implements OnInit {
  @Input() flows
  @Input() visibility:boolean
  @Input() author:boolean


  constructor(public router:Router,
              public flowService: FlowService,
              public entityService: EntityService,
              public dialog: MatDialog,
              public projectService: ProjectService) {
    this.visibility = true
  }

  ngOnInit() {
  }

  decommissionable(flow) {
    if(flow.direction != 1 ){
      return false
    }
    return true
  }
  shareable() {
    return true
  }
  shippable() {
    return true
  }
  viewable() {
    return true
  }
  answerable() {
    return !this.author
  }

  treatable() {
    return true
  }
  exportable() {
    return true
  }
  sendable(id) {
    return true
  }
  setProject(id) {
    this.projectService.setProject(id)
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
      flow_id : id,
      entity_id: entity_id
    })

    this.dialog.open(AnswerComponent);
  }


  dispatch(id) {
    this.projectService.setProject(id)
    this.dialog.open(DispatchComponent);
  }
}
