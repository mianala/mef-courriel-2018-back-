import {Component, OnInit} from '@angular/core';
import {FlowService} from "../../service/flow.service";
import {FilterService} from "../../service/filter.service";

@Component({
  selector: 'app-threads',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent implements OnInit {
  flows

  constructor(public filter: FilterService,
              private flowService: FlowService) {
    this.flows = []
  }

  ngOnInit() {
    this.filter.query.subscribe(query => {
      this.flowService.sent_flows.subscribe(flows => {
        this.flows = FilterService.filterFlow(flows, query)
      })
    })
  }

}
