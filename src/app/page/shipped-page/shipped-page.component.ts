import {Component, OnInit} from '@angular/core';
import {FlowService} from "../../service/flow.service";

@Component({
  selector: 'app-shipped-page',
  templateUrl: './shipped-page.component.html',
  styleUrls: ['./shipped-page.component.scss']
})
export class ShippedPageComponent implements OnInit {
  flows

  constructor(private flowService: FlowService) {
    this.flows = []
  }

  ngOnInit() {

    this.flowService.shipped_flows.subscribe(flows => {
      console.log(flows)
      this.flows = flows
    })
  }

}
