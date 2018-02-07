import {Component, OnInit} from '@angular/core';
import {DispatchComponent} from "../dialog/dispatch/dispatch.component";
import {MatDialog} from "@angular/material";
import {ProjectService} from "../project.service";
import {ThreadService} from "../../thread/thread.service";
import {FlowService} from "../../flow.service";
import {AnswerComponent} from "../../dialog/answer/answer.component";
import {MessageService} from "../../message.service";
import {EntityService} from "../../entity.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects
  flows
  downEntities

  constructor(public threadService: ThreadService,
              public flowService: FlowService,
              public messageService: MessageService,
              public entityService: EntityService,
              public dialog: MatDialog,
              public projectService: ProjectService) {
    this.projects = []
  }

  ngOnInit() {

    this.projectService.projects.subscribe(projects => {
      this.projects = projects
    })

    this.flowService.flows.subscribe(flows => {
      this.flows = flows
    })
  }

  setProject(id) {
    this.projectService.setProject(id)
  }


  dispatch(id) {
    this.projectService.setProject(id)
    this.dialog.open(DispatchComponent);
  }

  answer(id, entity_id) {
    this.messageService.messageData.next({
      flow_id: id,
      entity_id: entity_id,
    })

    this.dialog.open(AnswerComponent);
  }

}
