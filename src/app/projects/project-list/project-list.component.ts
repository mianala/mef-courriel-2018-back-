import {Component, OnInit} from '@angular/core';
import {DispatchComponent} from "../dialog/dispatch/dispatch.component";
import {MatDialog} from "@angular/material";
import {ProjectService} from "../project.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects

  constructor(public dialog: MatDialog, private projectService: ProjectService) {
  }

  ngOnInit() {
    this.projectService.projects.subscribe(projects => {
      this.projects = projects
    })
  }


  dispatch() {
    this.dialog.open(DispatchComponent);

  }

}
