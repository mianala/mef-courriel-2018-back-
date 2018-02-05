import {Component, Input, OnInit} from '@angular/core';
import {DispatchComponent} from "../dialog/dispatch/dispatch.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() project

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
  }

  dispatch(){
    this.dialog.open(DispatchComponent);
  }

}
