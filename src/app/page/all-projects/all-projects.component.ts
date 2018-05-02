import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../../service/project.service";
import {FilterService} from "../../service/filter.service";

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit {
  projects

  constructor(
    public filter: FilterService,
    private projectService: ProjectService) {
    this.projects = []

    this.filter.query.subscribe(query => {
      this.projectService.all_projects.subscribe(uprojects => {
        this.projects = FilterService.filterProject(uprojects,query)

      })
    })
  }

  ngOnInit() {
  }

}
