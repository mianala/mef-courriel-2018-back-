import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {UserService} from "../../user.service";
import {MD_DIALOG_DATA} from "@angular/material";
import {TransferService} from "../../transfer.service";

@Component({
  selector: 'app-dialog-transfer-mail',
  templateUrl: './dialog-transfer-mail.component.html',
  styleUrls: ['./dialog-transfer-mail.component.scss']
})
export class DialogTransferMailComponent implements OnInit {

  activeUser: User

  constructor
  (@Inject(MD_DIALOG_DATA) public flowId: any,
   private user: User,
   private transferService: TransferService,
   private userService: UserService) {
    this.userService.getActiveUser().subscribe(activeUser => {
      this.activeUser = activeUser
    });
  }

  ngOnInit() {
  }

  selectUser(user) {
    this.user = user;
  }

  transfer() {
    this.transferService.transferFlow({
      flowId: this.flowId,
      senderId: this.activeUser.id,
      receiverId: this.user.id,
    })
  }

}
