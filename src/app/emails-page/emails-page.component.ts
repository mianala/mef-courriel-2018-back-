import {Component, OnInit} from '@angular/core';
import {FlowService} from '../flow.service';
import {Flow} from '../../models/Flow';

@Component({
  selector: 'app-emails-page',
  templateUrl: './emails-page.component.html',
  styleUrls: ['./emails-page.component.scss']
})
export class EmailsPageComponent implements OnInit {
  flows;

  constructor(private flowService: FlowService) {
  }

  ngOnInit() {
    this.flowService.getFlows().subscribe(result => {
      this.flows = result;
    });
  }
}
