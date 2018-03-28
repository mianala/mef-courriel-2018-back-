import {Component, OnInit} from '@angular/core';
import {ThreadService} from "../../thread/thread.service";
import {ProjectService} from "../../projects/project.service";
import {FlowService} from "../../flow.service";

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent implements OnInit {
  flows

  constructor(private flowService: FlowService) {
    this.flows = []
  }

  ngOnInit() {

    this.flowService.sent_flows.subscribe(flows => {
      console.log(flows)
      this.flows = flows
    })}

}
