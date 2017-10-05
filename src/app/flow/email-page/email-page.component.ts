import {Component, OnInit} from '@angular/core'
import {FlowService} from '../../flow.service'
import {EmailService} from '../../email.service'
import {ActivatedRoute} from '@angular/router'
import {fadeInAnimation} from '../../animation/fadeIn'

@Component({
  selector: 'app-email-page',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './email-page.component.html',
  styleUrls: ['./email-page.component.scss']
})
export class EmailPageComponent implements OnInit {
  mails
  flow

  constructor(private flowService: FlowService,
              private emailService: EmailService) {
    this.flowService.reload()
  }

  ngOnInit() {

    this.flowService.flow.subscribe(flow => {
      this.flow = flow
    })

    this.emailService.emails.subscribe(data => {
      this.mails = data
    })

  }

}
