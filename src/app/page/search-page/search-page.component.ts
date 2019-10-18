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

  searchedReceivedFlows = []
  searchedSentFlows = []
  searchedProjects = []

  constructor(private projectService: ProjectService,
    private filterService: FilterService,
    private flowService: FlowService) {

    this.projectService.searched_projects.subscribe(ps => {
      this.searchedProjects = ps
    })

    this.flowService.searched_received_flows.subscribe(fs => {
      this.searchedReceivedFlows = fs
    })
    this.flowService.searched_sent_flows.subscribe(fs => {
      this.searchedSentFlows = fs
    })

  }

  ngOnInit() {
  }
}
