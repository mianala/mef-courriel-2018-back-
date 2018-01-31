import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../project.service";
import {ThreadService} from "../../thread/thread.service";
import {FlowService} from "../../flow.service";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {
  project
  threads
  flows

  constructor(private projectService: ProjectService,
              private flowService: FlowService,
              private threadService: ThreadService,
              ) {
    this.projectService.project.subscribe(project => {
      this.project = project
    })

    this.threadService.projectThreads.subscribe(threads => {
      this.threads = threads
    })

    this.flowService.projectFlows.subscribe(flows => {
      this.flows = flows
    })
  }

  ngOnInit() {
  }

}
