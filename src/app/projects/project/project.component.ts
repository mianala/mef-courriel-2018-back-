import {Component, Input, OnInit} from '@angular/core';
import {DispatchComponent} from "../dialog/dispatch/dispatch.component";
import {MatDialog} from "@angular/material";
import {EntityService} from "../../service/entity.service";

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() project

  constructor(public dialog: MatDialog, public entityService: EntityService) {

  }

  ngOnInit() {
  }

  dispatch() {
    this.dialog.open(DispatchComponent);
  }

}
