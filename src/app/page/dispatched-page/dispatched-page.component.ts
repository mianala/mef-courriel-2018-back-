import {Component, OnInit} from '@angular/core';
import {FlowService} from "../../service/flow.service";
import {EntityService} from "../../service/entity.service";
import {MatDialog} from "@angular/material";
import {Router} from "@angular/router";
import {ProjectService} from "../../service/project.service";

@Component({
  selector: 'app-dispatched-page',
  templateUrl: './dispatched-page.component.html',
  styleUrls: ['./dispatched-page.component.scss']
})
export class DispatchedPageComponent implements OnInit {
  projects
  constructor(
    public router:Router,
    private projectService: ProjectService) {

    this.projects = []
    this.projectService.dispatched_projects.subscribe(projects => {
      this.projects = projects
    })
  }

  ngOnInit() {
  }

}
