import {Component, OnInit} from '@angular/core';
import {FlowService} from '../../service/flow.service';
import {fadeInAnimation} from '../../animation/fadeIn'
import { ProjectService } from 'app/service/project.service';

@Component({
  selector: 'app-treated',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './treated.component.html',
  styleUrls: ['./treated.component.scss']
})
export class TreatedComponent implements OnInit {
  projects = []
  flows = []

  constructor(private projectService: ProjectService,
    private flowService: FlowService) {

    this.projectService.treated_projects.subscribe(ps => {
      this.projects = ps
    })

    this.flowService.treated_flows.subscribe(fs => {
      this.flows = fs
    })

  }

  ngOnInit() {
  }
}
