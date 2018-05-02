import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../service/project.service";
import {FilterService} from "../../service/filter.service";

@Component({
  selector: 'app-treated-project',
  templateUrl: './treated-project.component.html',
  styleUrls: ['./treated-project.component.scss']
})
export class TreatedProjectComponent implements OnInit {
  projects;

  constructor(public filter: FilterService,
              private projectService: ProjectService) {

    this.projects = [];

    this.filter.query.subscribe(query => {
      this.projectService.treated_projects.subscribe(uprojects => {
        this.projects = uprojects.filter(project => {
          return project.sender.toLowerCase().includes(query.toLowerCase()) || project.content.toLowerCase().includes(query.toLowerCase())
        })
      })
    })
  }

  ngOnInit() {
  }
}
