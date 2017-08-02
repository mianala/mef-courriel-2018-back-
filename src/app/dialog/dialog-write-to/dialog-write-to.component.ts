import {Component, Inject, OnInit, SimpleChange, SimpleChanges} from '@angular/core'
import {MD_DIALOG_DATA} from '@angular/material'
import {EmailService} from '../../email.service'
import {UserService} from "../../user.service";
import {FlowService} from "../../flow.service";
import {FroalaService} from "../../froala.service";

@Component({
  selector: 'app-dialog-write-to',
  templateUrl: './dialog-write-to.component.html',
  styleUrls: ['./dialog-write-to.component.scss']
})
export class DialogWriteToComponent implements OnInit {
  mail: any
  options: any
  sendtrigger: any

  constructor(@Inject(MD_DIALOG_DATA) public user: any,
              private flowService: FlowService,
              private froala: FroalaService,
              private userService: UserService) {
    this.mail = {}
    if (typeof user === 'object') {
      this.mail.receiver = this.user;
      this.sendtrigger = this.sendEmail
    } else {
      this.sendtrigger = this.answerFlow
    }
    this.options = this.froala.getOptions()
    this.userService.getActiveUser().subscribe(activeUser => {
      this.mail.starter = activeUser
    });
    this.mail.files = []
  }

  ngOnInit() {
  }


  getFiles(files) {
    this.mail.files = this.mail.files.concat(files)
  }

  sendEmail() {
    console.log(this.mail)
    this.flowService.startFlow(this.mail)
  }
  answerFlow() {
    console.log(this.mail)
  }
}
