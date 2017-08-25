import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-dialog-transfer-mail',
  templateUrl: './dialog-transfer-mail.component.html',
  styleUrls: ['./dialog-transfer-mail.component.scss']
})
export class DialogTransferMailComponent implements OnInit {

  constructor(private user: User, private userService: UserService) {
  }

  ngOnInit() {
  }

  selectUser(user) {
    this.user = user;
  }

  transfer() {

  }

}
