import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

@Component({
  selector: '[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user;

  constructor(public dialog: MatDialog) {
  }


  writeTo() {
  }

  ngOnInit() {
  }

}
