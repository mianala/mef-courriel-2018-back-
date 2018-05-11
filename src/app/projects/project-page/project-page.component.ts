import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../service/project.service";
import {ThreadService} from "../../service/thread.service";
import {FlowService} from "../../service/flow.service";
import {UserService} from "../../service/user.service";
import {FilterService} from "../../service/filter.service";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {
  project;
  flows;
  user;

  constructor(private projectService: ProjectService,
              private flowService: FlowService,
              public filter: FilterService,
              private userService: UserService) {
    this.projectService.project.subscribe(project => {
      this.project = project
    });

    this.filter.query.subscribe(query => {
      this.flowService.project_flows.subscribe(uflows => {
        this.flows = FilterService.filterFlow(uflows, query)
      })
    });

    this.userService.user.subscribe(user => {
      this.user = user
    })
  }

  ngOnInit() {
  }

}
