import {Component, OnInit} from '@angular/core';
import {EntityService} from "../../service/entity.service";
import {FlowService} from "../../service/flow.service";
import {ProjectService} from "../../service/project.service";

@Component({
  selector: 'app-project-nav',
  templateUrl: './project-nav.component.html',
  styleUrls: ['./project-nav.component.scss']
})
export class ProjectNavComponent implements OnInit {
  label
  flow_count: number
  treated_count: number
  sent_count: number

  saved_count: number
  dispatched_count: number

  shipped_count: number
  returned_count: number

  constructor(private entityService: EntityService, public flowService: FlowService, public projectService: ProjectService) {
    this.entityService.entity.subscribe(entity => {
      this.label = entity['label']
    })
  }

  ngOnInit() {
    this.flowService.flows.subscribe(flows => {
      this.flow_count = flows.length
    })

    this.flowService.sent_flows.subscribe(flows => {
      this.sent_count = flows.length
    })

    this.flowService.treated_flows.subscribe(flows => {
      this.treated_count = flows.length
    })

    this.flowService.treated_flows.subscribe(flows => {
      this.treated_count = flows.length
    })

    this.flowService.shipped_flows.subscribe(flows => {
      this.shipped_count = flows.length
    })

    this.flowService.returned_flows.subscribe(flows => {
      this.returned_count = flows.length
    })

    this.projectService.dispatched_projects.subscribe(projects => {
      this.dispatched_count = projects.length
    })

    this.projectService.projects.subscribe(projects => {
      this.saved_count = projects.length
    })
  }

}
