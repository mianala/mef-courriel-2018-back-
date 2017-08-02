import {Component, OnInit} from '@angular/core';
import {DialogWriteEmailComponent} from '../../dialog/dialog-write-email/dialog-write-email.component';
import {MdDialog, MdDialogRef} from '@angular/material';
import {DialogSaveMailComponent} from '../../dialog/dialog-save-mail/dialog-save-mail.component';
import {NavigationStart, Router} from "@angular/router";
import {DialogWriteToComponent} from "../../dialog/dialog-write-to/dialog-write-to.component";

@Component({
  selector: 'app-emails-fab',
  templateUrl: './emails-fab.component.html',
  styleUrls: ['./emails-fab.component.scss']
})
export class EmailsFabComponent implements OnInit {
  answer: boolean
  flowUrl = '/courriels/'
  flowId: string

  constructor(public dialog: MdDialog, private router: Router) {
    router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          const url = event.url.toLowerCase()
          this.answer = url.indexOf(this.flowUrl.toLowerCase()) > -1;
          if (this.answer) {
            this.flowId = url.slice(this.flowUrl.length, url.length)
            console.log(this.flowId)
          }
        }
      }
    )
  }

  ngOnInit() {
  }

  writeEmail() {
    const dialogWriteEmail = this.dialog.open(DialogWriteEmailComponent);
    dialogWriteEmail.afterClosed().subscribe(result => {
    })
  }

  answerEmail() {
    const dialogWriteEmail = this.dialog.open(DialogWriteToComponent, {
        data : []
      })
    ;
    dialogWriteEmail.afterClosed().subscribe(result => {
    })
  }

  saveEmail() {
    const dialogSaveEmail = this.dialog.open(DialogSaveMailComponent);
    dialogSaveEmail.afterClosed().subscribe(result => {
    })
  }

}
