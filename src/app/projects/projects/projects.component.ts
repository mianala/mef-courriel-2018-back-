import {Component, Input, OnInit} from '@angular/core';
import {EntityService} from "../../service/entity.service";
import {MatDialog} from "@angular/material";
import {ProjectService} from "../../service/project.service";
import {DispatchComponent} from "../dialog/dispatch/dispatch.component";
import {Router} from "@angular/router";
import {GlobalService} from "../../service/global.service";
import {FilterService} from "../../service/filter.service";

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @Input() projects;

  constructor(public router: Router,
              public entityService: EntityService,
              public filter: FilterService,
              public dialog: MatDialog,
              private projectService: ProjectService) {

  }

  ngOnInit() {
  }

  sameday(project) {
    return GlobalService.sameDay(new Date(project.date), new Date())
  }

  setProject(id) {
    this.projectService.setProject(id);
    this.router.navigateByUrl('/courriels/courriel')
  }

  submitable() {
    return false
  }

  viewable(project) {
    return project.dispatched == 1
  }

  submit() {

  }

  treatable(project) {

    return project.status_id != 1
  }

  treat(project) {
    this.projectService.treat(project)
  }

  dispatch(id) {
    this.projectService.setProject(id);
    this.dialog.open(DispatchComponent);
  }
}
