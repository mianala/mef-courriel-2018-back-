import {Component, Input, OnInit} from '@angular/core';
import {DispatchComponent} from "../dialog/dispatch/dispatch.component";
import {MatDialog} from "@angular/material";
import {EntityService} from "../../service/entity.service";
import {GlobalService} from "../../service/global.service";

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() project;
  in_types;
  letter_types;

  constructor(public dialog: MatDialog, public entityService: EntityService) {
    this.letter_types = GlobalService.letter_types;
    this.in_types = GlobalService.in_types
  }

  ngOnInit() {

  }

  composed(){
    return this.project.composed == 1
  }

  dispatch() {
    this.dialog.open(DispatchComponent);
  }

}
