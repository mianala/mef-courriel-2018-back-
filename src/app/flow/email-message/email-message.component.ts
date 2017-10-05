import {Component, Input, OnInit} from '@angular/core'
import {User} from '../../../models/User'
import {FlowService} from "../../flow.service";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-email-message',
  templateUrl: './email-message.component.html',
  styleUrls: ['./email-message.component.scss']
})
export class EmailMessageComponent implements OnInit {
  @Input() mail
  user: User

  constructor(private flowService: FlowService, private userService: UserService) {
  }

  ngOnInit() {
    this.flowService.flow.subscribe(flow => {
      this.userService.userObject.subscribe(user => {
        const writer = user.id === flow.writer_id
        if (this.mail.sentBy) {
          if (writer) {
            this.user = user
          } else {
            this.user = flow.user
          }
        } else {
          if (writer) {

            this.user = flow.user
          } else {
            this.user = user
          }
        }
      })
    })
  }

}
