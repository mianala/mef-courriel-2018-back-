import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../../models/User';
import {EmailService} from "../email.service";

@Component({
  selector: 'app-dialog-write-email',
  templateUrl: './dialog-write-email.component.html',
  styleUrls: ['./dialog-write-email.component.scss']
})
export class DialogWriteEmailComponent implements OnInit {


  constructor(private user: User, private emailService: EmailService, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getActiveUser().subscribe(data => {
      this.user = data;
    })
  }

  sendEmail() {
    this.emailService.sendEmail();
  }

  selectUser(user) {
    this.user = user;
  }

}
