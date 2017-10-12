import {Component, Input, OnInit} from '@angular/core'
import {User} from '../../../models/User'
import {FlowService} from '../../flow.service';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-email-message',
  templateUrl: './email-message.component.html',
  styleUrls: ['./email-message.component.scss']
})
export class EmailMessageComponent implements OnInit {
  @Input() mail
  user: User

  constructor(private flowService: FlowService, private userService: UserService) {
    if (!this.userService.user.getValue()) {
      console.log('no active flow')
    }
  }

  ngOnInit() {
    const writer = this.userService.user.getValue().id === this.mail.writer_id
    if (writer) {
      this.user = this.userService.user.getValue()
    } else {
      this.user = this.flowService.flow.getValue().user
    }
  }

}
