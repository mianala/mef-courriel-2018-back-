import {Component, Input, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {DialogWriteToComponent} from '../dialog-write-to/dialog-write-to.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user;

  constructor(public dialog: MdDialog) {
  }


  writeTo() {
    const dialogWriteEmail = this.dialog.open(DialogWriteToComponent, {
        data: this.user
      })
    ;
    dialogWriteEmail.afterClosed().subscribe(result => {
    })
  }

  ngOnInit() {
  }

}
