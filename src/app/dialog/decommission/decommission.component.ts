import {Component, OnInit} from '@angular/core';
import {FlowService} from "../../flow.service";

@Component({
  selector: 'app-decommission',
  templateUrl: './decommission.component.html',
  styleUrls: ['./decommission.component.scss']
})
export class DecommissionComponent implements OnInit {
  flow

  constructor(private flowService: FlowService) {

  }

  ngOnInit() {
  }

  submit() {
    this.flowService.decommission(this.flow)
  }

}
