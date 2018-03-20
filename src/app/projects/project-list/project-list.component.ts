import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {FlowService} from "../../flow.service";
import {EntityService} from "../../entity.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  flows

  constructor(public flowService: FlowService,
              public entityService: EntityService,
              public dialog: MatDialog) {
    flowService.flows.subscribe(flows => {
      this.flows = flows
    })
  }

  ngOnInit() {

  }


}
