import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectService} from "../../service/project.service";
import {FilterService} from "../../service/filter.service";

@Component({
  selector: 'app-dispatched-page',
  templateUrl: './dispatched-page.component.html',
  styleUrls: ['./dispatched-page.component.scss']
})
export class DispatchedPageComponent implements OnInit {
  projects;

  constructor(
    public router: Router, public filter: FilterService,
    private projectService: ProjectService) {
    this.projects = [];

    this.filter.query.subscribe(query => {
      console.log(query)
      this.projectService.dispatched_projects.subscribe(uprojects => {
        this.projects = FilterService.filterProject(uprojects,query)
      })
    })
  }

  ngOnInit() {
  }

}
