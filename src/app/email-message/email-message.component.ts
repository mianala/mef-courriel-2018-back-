import {Component, Input, OnInit} from '@angular/core'
import {User} from '../../models/User'

@Component({
  selector: 'app-email-message',
  templateUrl: './email-message.component.html',
  styleUrls: ['./email-message.component.scss']
})
export class EmailMessageComponent implements OnInit {
  @Input() mail
  user: User

  constructor() {
  }

  ngOnInit() {
    this.user = this.mail.user
  }

}
