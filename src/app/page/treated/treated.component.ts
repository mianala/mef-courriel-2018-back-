import {Component, OnInit} from '@angular/core';
import {FlowService} from "../../service/flow.service";
import {FilterService} from "../../service/filter.service";
import {fadeInAnimation} from '../../animation/fadeIn'
import {EntityService} from '../../service/entity.service';

@Component({
  selector: 'app-treated',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './treated.component.html',
  styleUrls: ['./treated.component.scss']
})
export class TreatedComponent implements OnInit {
  flows;

  constructor(public filter: FilterService,
              private flowService: FlowService,
              private entityService:EntityService) {
    this.flows = []
  }

  ngOnInit() {

    this.filter.query.subscribe(query => {

      this.flowService.treated_flows.subscribe(uflows => {
        this.flows = FilterService.filterFlow(uflows,query)

      })
    })
  }

}
