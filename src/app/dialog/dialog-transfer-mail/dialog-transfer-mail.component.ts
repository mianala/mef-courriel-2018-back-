import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../../../models/User';
import {UserService} from '../../user.service';
import {MD_DIALOG_DATA} from '@angular/material';
import {FlowService} from '../../flow.service';

@Component({
  selector: 'app-dialog-transfer-mail',
  templateUrl: './dialog-transfer-mail.component.html',
  styleUrls: ['./dialog-transfer-mail.component.scss']
})
export class DialogTransferMailComponent implements OnInit {
  title
  content
  activeUser: any
  savedId

  constructor
  (@Inject(MD_DIALOG_DATA) public data: any,
   private user: User,
   private flowService: FlowService,
   private userService: UserService) {
    this.userService.userObject.subscribe(activeUser => {
      console.log(data)
      this.savedId = data
      this.activeUser = activeUser
    });
  }

  ngOnInit() {
  }

  selectUser(user) {
    this.user = user;
  }

  transfer() {
    const flow = {
      savedId: this.savedId,
      title: this.title,
      content: this.content,
      starter: this.activeUser,
      receiver: this.user,
    }
    console.log(flow)
    this.flowService.startFlow(flow)
  }

}
