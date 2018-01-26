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
  flows

  constructor(private projectService: ProjectService,
              private flowService: FlowService) {
    this.projectService.project.subscribe(project => {
      this.project = project
    })

    this.flowService.projectFlows.subscribe(flows => {
      this.flows = flows
    })
  }

  ngOnInit() {
  }

}
