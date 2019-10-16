import {Component, OnInit} from '@angular/core';
import {FlowService} from "../../service/flow.service";
import {FilterService} from "../../service/filter.service";
import {fadeInAnimation} from '../../animation/fadeIn'

@Component({
  selector: 'app-threads',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent implements OnInit {
  flows

  constructor(public filter: FilterService,
              private flowService: FlowService) {
    this.flows = []
  }

  ngOnInit() {
  }

}
