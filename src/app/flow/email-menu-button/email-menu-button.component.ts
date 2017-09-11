import {Component, Input, OnInit} from '@angular/core';
import {MdDialog} from "@angular/material";
import {DialogTransferMailComponent} from "../../dialog/dialog-transfer-mail/dialog-transfer-mail.component";

@Component({
  selector: 'app-email-menu-button',
  templateUrl: './email-menu-button.component.html',
  styleUrls: ['./email-menu-button.component.scss']
})
export class EmailMenuButtonComponent implements OnInit {

  @Input() id
  constructor(public dialog: MdDialog) {
  }

  ngOnInit() {
  }

  openTransfer() {
    const dialogTransfer = this.dialog.open(DialogTransferMailComponent, {
      data: this.id
    });

    dialogTransfer.afterClosed().subscribe(result => {
    })
  }
}
