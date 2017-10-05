// user already defined


import {Component, Inject, OnInit, SimpleChange, SimpleChanges} from '@angular/core'
import {MD_DIALOG_DATA} from '@angular/material'
import {EmailService} from '../../email.service'
import {UserService} from '../../user.service';
import {FlowService} from '../../flow.service';
import {FroalaService} from '../../froala.service';

@Component({
  selector: 'app-dialog-write-to',
  templateUrl: './dialog-write-to.component.html',
  styleUrls: ['./dialog-write-to.component.scss']
})
export class DialogWriteToComponent implements OnInit {
  mail: any
  options: any
  sendtrigger = function () {
  }

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              private flowService: FlowService,
              private emailService: EmailService,
              private froala: FroalaService,
              private userService: UserService) {
    this.mail = {
      title: '',
      content: ''
    }
    this.userService.userObject.subscribe(activeUser => {
      this.mail.activeUser = activeUser;
      if (data.im !== undefined) {
        console.log('start flow')
        this.mail.receiver = this.data;
        this.sendtrigger = this.sendEmail
      } else {
        this.flowService.flow.subscribe(flow => {
          this.mail.flow_id = this.data
          if (activeUser.id === flow.starter_id) {
            this.mail.starter = 0
            this.userService.getUser(flow.receiver_id).subscribe(user => {
              this.mail.receiver = user
            })
          } else {
            this.mail.starter = 1
            this.userService.getUser(flow.starter_id).subscribe(user => {
              this.mail.receiver = user
            })
          }
        })
        this.sendtrigger = this.answerFlow
      }

    });

    this.options = this.froala.getOptions()

    this.mail.files = []
  }

  ngOnInit() {
  }

  getFiles(files) {
    this.mail.files = this.mail.files.concat(files)
  }

  sendEmail() {
    console.log(this.mail)
    this.flowService.start(this.mail)
  }

  answerFlow() {
    this.emailService.answerFlow(this.mail)
  }
}
