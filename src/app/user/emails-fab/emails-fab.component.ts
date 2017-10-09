import {Component, OnInit} from '@angular/core';
import {DialogWriteEmailComponent} from '../../dialog/dialog-write-email/dialog-write-email.component';
import {MdDialog} from '@angular/material';
import {DialogSaveMailComponent} from '../../dialog/dialog-save-mail/dialog-save-mail.component';
import {NavigationStart, Router} from '@angular/router';
import {DialogWriteToComponent} from '../../dialog/dialog-write-to/dialog-write-to.component';

@Component({
  selector: 'app-emails-fab',
  templateUrl: './emails-fab.component.html',
  styleUrls: ['./emails-fab.component.scss']
})
export class EmailsFabComponent implements OnInit {
  answer: boolean

  constructor(public dialog: MdDialog, private router: Router) {
    this.answer = router.url.indexOf('/courriels/courriel') > -1;
    router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.answer = event.url.indexOf('/courriels/courriel') > -1;
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
    const dialogWriteEmail = this.dialog.open(DialogWriteToComponent)
    ;
    dialogWriteEmail.afterClosed().subscribe(result => {
    })
  }

  saveEmail() {
    const dialogSaveEmail = this.dialog.open(DialogSaveMailComponent);
    dialogSaveEmail.afterClosed().subscribe(result => {
    })
  }

  report(){

  }

}
