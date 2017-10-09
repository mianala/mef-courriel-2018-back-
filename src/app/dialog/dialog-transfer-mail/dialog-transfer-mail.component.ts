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
  savedId

  constructor
  (@Inject(MD_DIALOG_DATA) public data: any,
   private user: User,
   private flowService: FlowService) {
    this.savedId = data
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
      user: this.user,
    }
    console.log(flow)
    this.flowService.start(flow)
  }

}
