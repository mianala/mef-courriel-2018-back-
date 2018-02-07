import { Component, OnInit } from '@angular/core';
import {FlowService} from "../../flow.service";
import {EntityService} from "../../entity.service";
import {MatDialog} from "@angular/material";
import {MessageService} from "../../message.service";
import {ProjectService} from "../project.service";
import {DispatchComponent} from "../dialog/dispatch/dispatch.component";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects

  constructor(
    public flowService: FlowService,
    public messageService: MessageService,
    public entityService: EntityService,
    public dialog: MatDialog,
    private projectService: ProjectService) {

    this.projects = []
    this.projectService.projects.subscribe(projects => {
      this.projects = projects
    })
  }

  ngOnInit() {
  }

  setProject(id) {
    this.projectService.setProject(id)
  }

  dispatch(id) {
    this.projectService.setProject(id)
    this.dialog.open(DispatchComponent);
  }
}
