import { Component, OnInit } from '@angular/core';
import {FlowService} from "../../flow.service";
import {EntityService} from "../../entity.service";
import {MatDialog} from "@angular/material";
import {ProjectService} from "../project.service";
import {DispatchComponent} from "../dialog/dispatch/dispatch.component";
import {DialogWriteEmailComponent} from "../../dialog/dialog-write-email/dialog-write-email.component";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects

  constructor(
    public flowService: FlowService,
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

  writeEmail() {
    const dialogWriteEmail = this.dialog.open(DialogWriteEmailComponent);
    dialogWriteEmail.afterClosed().subscribe(result => {
    })
  }
  dispatch(id) {
    this.projectService.setProject(id)
    this.dialog.open(DispatchComponent);
  }
}
