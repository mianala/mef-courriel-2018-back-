import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {FlowService} from "../../service/flow.service";
import {EntityService} from "../../service/entity.service";
import {FilterService} from "../../service/filter.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class ProjectListComponent implements OnInit {
  flows

  constructor(public flowService: FlowService,
              public entityService: EntityService,
              public filter: FilterService,
              public dialog: MatDialog) {
    flowService.flows.subscribe(unfiltered_flows => {

      this.filter.query.subscribe(query => {

        let flows = unfiltered_flows.filter(flow => {
          return flow.sender_entity_label.toLowerCase().includes(query.toLowerCase())
        })
        this.flows = flows
      })

    })
  }

  ngOnInit() {

  }


}
