import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {FlowService} from "../../service/flow.service";
import {EntityService} from "../../service/entity.service";
import {FilterService} from "../../service/filter.service";
import {fadeInAnimation} from '../../animation/fadeIn'

@Component({
  selector: 'inbox',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class ProjectListComponent implements OnInit {
  flows;

  constructor(public flowService: FlowService,
              public entityService: EntityService,
              public filter: FilterService,
              public dialog: MatDialog) {
  }

  ngOnInit() {


    this.filter.query.subscribe(query => {
      this.flowService.flows.subscribe(uflows => {
        this.flows = FilterService.filterFlow(uflows,query)
      })
    })
  }


}
