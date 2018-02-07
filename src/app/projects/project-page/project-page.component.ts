import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../project.service";
import {ThreadService} from "../../thread/thread.service";
import {FlowService} from "../../flow.service";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {
  project
  projectThreads
  flows
  user

  constructor(private projectService: ProjectService,
              private flowService: FlowService,
              private userService: UserService,
              private threadService: ThreadService) {
    this.projectService.project.subscribe(project => {
      this.project = project

    })

    this.threadService.projectThreads.subscribe(projectThreads => {
      this.projectThreads = projectThreads
    })

    this.flowService.projectFlows.subscribe(flows => {
      this.flows = flows
    })

    this.userService.user.subscribe(user => {
      this.user = user
    })
  }

  ngOnInit() {
  }

}
