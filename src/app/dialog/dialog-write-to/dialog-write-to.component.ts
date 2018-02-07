// user already defined


import {Component, Inject, OnInit, SimpleChange, SimpleChanges} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material'
import {EmailService} from '../../email.service'
import {UserService} from '../../user.service';
import {FlowService} from '../../flow.service';
import {FroalaService} from '../../froala.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../notification.service';

@Component({
  selector: 'app-dialog-write-to',
  templateUrl: './dialog-write-to.component.html',
  styleUrls: ['./dialog-write-to.component.scss']
})
export class DialogWriteToComponent implements OnInit {
  mail: any
  options: any
  submit = function () {
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DialogWriteToComponent>,
              private flowService: FlowService,
              private router: Router,
              private emailService: EmailService,
              private froala: FroalaService,
              private notification: NotificationService) {
    this.mail = {
      title: '',
      content: '',
      files: []
    }

    this.submit = this.answerFlow
    if (router.url.includes('/courriels/courriel')) {
      this.flowService.flow.subscribe(flow => {
        this.mail.user = flow['user'];
      })
    } else {
      this.mail.user = data
      this.submit = this.startFlow
    }


    // froala option
    this.options = this.froala.getOptions()
  }

  ngOnInit() {
  }

  getFiles(files) {
    this.mail.files = this.mail.files.concat(files)
  }

  startFlow() {
    console.log(this.mail)
    this.dialogRef.close()
    this.flowService.start(this.mail)
  }

  answerFlow() {
    if (this.mail.title === '' && this.mail.content === '' && this.mail.files.length === 0) {
      this.notification.formError()
      return
    }
    this.dialogRef.close()
    this.emailService.answerFlow(this.mail)
  }
}
