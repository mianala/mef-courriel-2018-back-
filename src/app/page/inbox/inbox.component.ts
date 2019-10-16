import {Component, OnInit} from '@angular/core';
import {FlowService} from "../../service/flow.service";
import {FilterService} from "../../service/filter.service";
import {fadeInAnimation} from '../../animation/fadeIn'
import { ProjectService } from 'app/service/project.service';

@Component({
  selector: 'inbox',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  projects = []
  flows = []

  constructor(private projectService: ProjectService,
    private flowService: FlowService) {

    this.flowService.received_flows.subscribe(fs => {
      this.flows = fs
    })

  }

  ngOnInit() {
  }
}
