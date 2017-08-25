import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";

@Component({
  selector: 'app-dialog-transfer-mail',
  templateUrl: './dialog-transfer-mail.component.html',
  styleUrls: ['./dialog-transfer-mail.component.scss']
})
export class DialogTransferMailComponent implements OnInit {

  constructor(private user: User) {
  }

  ngOnInit() {
  }

  selectUser(user) {
    this.user = user;
  }

  transfer() {

  }

}
