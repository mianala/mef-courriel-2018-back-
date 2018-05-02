import {Component, OnInit} from '@angular/core';
import {FlowService} from "../../service/flow.service";
import {FilterService} from "../../service/filter.service";

@Component({
  selector: 'app-treated',
  templateUrl: './treated.component.html',
  styleUrls: ['./treated.component.scss']
})
export class TreatedComponent implements OnInit {
  flows

  constructor(public filter: FilterService,
              private flowService: FlowService) {
    this.flows = []
  }

  ngOnInit() {
    this.filter.query.subscribe(query => {
      this.flowService.treated_flows.subscribe(uflows => {
        this.flows = uflows.filter(flow => {
          return flow.sender_entity_label.toLowerCase().includes(query.toLowerCase()) || flow.content.toLowerCase().includes(query.toLowerCase())
        })
      })
    })
  }

}
