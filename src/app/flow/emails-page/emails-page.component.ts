import {Component, OnInit} from '@angular/core';
import {FlowService} from '../../flow.service';
import {fadeInAnimation} from '../../animation/fadeIn'

@Component({
  selector: 'app-emails-page',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './emails-page.component.html',
  styleUrls: ['./emails-page.component.scss']
})
export class EmailsPageComponent implements OnInit {
  flows

  constructor(private flowService: FlowService) {
  }

  ngOnInit() {
    this.flowService.flows.subscribe(flows => {
      this.flows = flows
    })
  }
}
