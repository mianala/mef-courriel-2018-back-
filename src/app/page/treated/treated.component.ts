import { Component, OnInit } from '@angular/core';
import {FlowService} from "../../service/flow.service";

@Component({
  selector: 'app-treated',
  templateUrl: './treated.component.html',
  styleUrls: ['./treated.component.scss']
})
export class TreatedComponent implements OnInit {
  flows

  constructor(private flowService: FlowService) {
    this.flows = []
  }

  ngOnInit() {

    this.flowService.treated_flows.subscribe(flows => {
      console.log(flows)
      this.flows = flows
    })
  }

}
