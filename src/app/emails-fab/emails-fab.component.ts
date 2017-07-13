import { Component, OnInit } from '@angular/core';
import {DialogWriteEmailComponent} from '../dialog-write-email/dialog-write-email.component';
import {MdDialog, MdDialogRef} from '@angular/material';
import {DialogSaveMailComponent} from '../dialog-save-mail/dialog-save-mail.component';

@Component({
  selector: 'app-emails-fab',
  templateUrl: './emails-fab.component.html',
  styleUrls: ['./emails-fab.component.scss']
})
export class EmailsFabComponent implements OnInit {

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }
  writeEmail() {
    const dialogWriteEmail = this.dialog.open(DialogWriteEmailComponent);
    dialogWriteEmail.afterClosed().subscribe(result => {
    })
  }
  saveEmail() {
    const dialogSaveEmail = this.dialog.open(DialogSaveMailComponent);
    dialogSaveEmail.afterClosed().subscribe(result => {
    })
  }

}
