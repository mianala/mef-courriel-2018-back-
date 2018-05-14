import {Component, OnInit} from '@angular/core';
import {FlowService} from "../../service/flow.service";
import {fadeInAnimation} from '../../animation/fadeIn'

@Component({
  selector: 'app-shipped-page',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
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
