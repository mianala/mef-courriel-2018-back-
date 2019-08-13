import { Component, OnInit } from '@angular/core';
import { EntityService } from "../../service/entity.service";
import { FlowService } from "../../service/flow.service";
import { ProjectService } from "../../service/project.service";

@Component({
  selector: 'app-project-nav',
  templateUrl: './project-nav.component.html',
  styleUrls: ['./project-nav.component.scss']
})
export class ProjectNavComponent implements OnInit {
  label
 

  constructor(private entityService: EntityService, public flowService: FlowService, public projectService: ProjectService) {
    this.entityService.entity.subscribe(entity => {
      if (!entity) { return }
      if (entity['label']) {
        this.label = entity['label']
      }
    })
  }

  ngOnInit() {
  }

}
