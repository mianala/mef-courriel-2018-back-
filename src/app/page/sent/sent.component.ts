import {Component, OnInit} from '@angular/core';
import {ThreadService} from "../../service/thread.service";
import {ProjectService} from "../../service/project.service";
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
      console.log(flows)
      this.flows = flows
    })
  }

}
