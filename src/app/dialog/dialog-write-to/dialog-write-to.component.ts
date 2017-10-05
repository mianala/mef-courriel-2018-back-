// user already defined


import {Component, Inject, OnInit, SimpleChange, SimpleChanges} from '@angular/core'
import {MD_DIALOG_DATA} from '@angular/material'
import {EmailService} from '../../email.service'
import {UserService} from '../../user.service';
import {FlowService} from '../../flow.service';
import {FroalaService} from '../../froala.service';
import {Router} from "@angular/router";

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

  constructor(private flowService: FlowService,
              private router: Router,
              private emailService: EmailService,
              private froala: FroalaService) {
    this.mail = {
      title: '',
      content: '',
      files: []
    }

    this.sendtrigger = this.answerFlow
    if (router.url.includes('/courriels/courriel')) {

      this.flowService.flow.subscribe(flow => {
        this.mail.user = flow.user;
      })
    } else {


      this.sendtrigger = this.startFlow
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
    this.flowService.start(this.mail)
  }

  answerFlow() {
    this.emailService.answerFlow(this.mail)
  }
}
