import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'app/service/project.service';
import { FlowService } from 'app/service/flow.service';
import { FilterService } from 'app/service/filter.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  projects = []
  flows = []

  filteredFlows = []
  filteredProjects = []

  constructor(private projectService: ProjectService,
    private filterService: FilterService,
    private flowService: FlowService) {
    this.projectService.all_projects.subscribe(ps => {
      this.projects = ps
    })

    this.flowService.all_flows.subscribe(fs => {
      this.flows = fs
    })

    this.filterService.query.subscribe(q => {
      // timeout here? or in toolbar?
      this.filteredFlows = FilterService.filterFlow(this.flows, q)
      this.filteredProjects = FilterService.filterProject(this.projects, q)
    })
  }

  ngOnInit() {
  }
}
