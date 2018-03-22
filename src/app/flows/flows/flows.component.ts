import {Component, Input, OnInit} from '@angular/core';
import {FlowService} from "../../flow.service";
import {EntityService} from "../../entity.service";
import {DispatchComponent} from "../../projects/dialog/dispatch/dispatch.component";
import {MatDialog} from "@angular/material";
import {ThreadService} from "../../thread/thread.service";
import {ProjectService} from "../../projects/project.service";
import {AnswerComponent} from "../../dialog/answer/answer.component";

@Component({
  selector: 'flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.scss']
})
export class FlowsComponent implements OnInit {
  @Input() flows

  constructor(
              public flowService: FlowService,
              public entityService: EntityService,
              public dialog: MatDialog,
              public projectService: ProjectService) {

  }

  ngOnInit() {
  }

  decommissionable() {
    return true
  }
  shareable() {
    return true
  }
  shippable() {
    return true
  }
  answerable() {
    return true
  }

  treatable() {
    return true
  }

  setProject(id) {
    this.projectService.setProject(id)
  }


  dispatch(id) {
    this.projectService.setProject(id)
    this.dialog.open(DispatchComponent);
  }

  answer(id, entity_id) {
    this.flowService.answerData.next({
      flow_id : id,
      entity_id: entity_id
    })

    this.dialog.open(AnswerComponent);
  }
}
