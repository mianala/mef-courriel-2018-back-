import {Component, OnInit} from '@angular/core';
import {FlowService} from "../../service/flow.service";

@Component({
  selector: 'app-threads',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent implements OnInit {
  flows

  constructor(private flowService: FlowService) {
    this.flows = []
  }

  ngOnInit() {
    this.flowService.sent_flows.subscribe(flows => {
      this.flows = flows
    })
  }

}
