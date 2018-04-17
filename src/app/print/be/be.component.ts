import { Component, OnInit } from '@angular/core';
import {FlowService} from "../../service/flow.service";

@Component({
  selector: 'app-be',
  templateUrl: './be.component.html',
  styleUrls: ['./be.component.scss']
})
export class BeComponent implements OnInit {
be
  constructor(flowService:FlowService) {
  	flowService.be.subscribe(be => {
  		this.be = be
  	})
  }

  ngOnInit() {
  }

}
