import {Component, Input, OnInit} from '@angular/core';
import {DialogTransferMailComponent} from '../../dialog/dialog-transfer-mail/dialog-transfer-mail.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-transfer-button',
  templateUrl: './transfer-button.component.html',
  styleUrls: ['./transfer-button.component.scss']
})
export class TransferButtonComponent implements OnInit {

  @Input() id

  constructor(public dialog: MatDialog) {
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
