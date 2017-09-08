import {Component, OnInit} from '@angular/core';
import {MdDialog} from "@angular/material";
import {DialogTransferMailComponent} from "../../dialog/dialog-transfer-mail/dialog-transfer-mail.component";

@Component({
  selector: 'app-email-menu-button',
  templateUrl: './email-menu-button.component.html',
  styleUrls: ['./email-menu-button.component.scss']
})
export class EmailMenuButtonComponent implements OnInit {

  constructor(public dialog: MdDialog) {
  }

  ngOnInit() {
  }

  openTransfer() {
    const dialogTransfer = this.dialog.open(DialogTransferMailComponent);
    dialogTransfer.afterClosed().subscribe(result => {
    })
  }
}
