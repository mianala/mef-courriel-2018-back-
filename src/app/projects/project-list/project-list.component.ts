import {Component, OnInit} from '@angular/core';
import {DispatchComponent} from "../dialog/dispatch/dispatch.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  constructor(public dialog: MatDialog,) {
  }

  ngOnInit() {
  }


  dispatch() {
    this.dialog.open(DispatchComponent);

  }

}
