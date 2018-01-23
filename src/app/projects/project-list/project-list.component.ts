import {Component, OnInit} from '@angular/core';
import {DispatchComponent} from "../dialog/dispatch/dispatch.component";
import {MatDialog} from "@angular/material";
import {ProjectService} from "../project.service";
import {ThreadService} from "../../thread/thread.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects
  threads

  constructor(public threadService: ThreadService, public dialog: MatDialog, private projectService: ProjectService) {
    this.projects = []
  }

  ngOnInit() {

    this.projectService.projects.subscribe(projects => {
      this.projects = projects
    })

    this.threadService.threads.subscribe(threads => {
      this.threads = threads
    })
  }

  setProject(id) {
    this.projectService.setProject(id)
  }


  dispatch(id) {
    this.projectService.setProject(id)
    this.dialog.open(DispatchComponent);
  }

}
