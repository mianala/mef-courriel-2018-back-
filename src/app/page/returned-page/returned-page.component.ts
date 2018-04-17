import {Component, OnInit} from '@angular/core';
import {FlowService} from "../../service/flow.service";

@Component({
  selector: 'app-returned-page',
  templateUrl: './returned-page.component.html',
  styleUrls: ['./returned-page.component.scss']
})
export class ReturnedPageComponent implements OnInit {
  flows

  constructor(private flowService: FlowService) {
    this.flows = []
  }

  ngOnInit() {

    this.flowService.returned_flows.subscribe(flows => {
      console.log(flows)
      this.flows = flows
    })
  }

}
