import {Component, Input, OnInit} from '@angular/core';
import {FlowService} from "../../flow.service";

@Component({
  selector: '[app-email]',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  @Input() flow;

  constructor(private flowService: FlowService) {
  }

  ngOnInit() {
  }

  setFlow(id) {
    this.flowService.setFlow(id)
  }

}
