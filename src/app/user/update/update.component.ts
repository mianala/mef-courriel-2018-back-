import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {MatDialogRef} from '@angular/material/dialog';
import {DispatchComponent} from '../../projects/dialog/dispatch/dispatch.component';
import {NotificationService} from '../../service/notification.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  credentials
  usernames
  confirm_password

  constructor(private userService: UserService, private notification: NotificationService,
              public dialogRef: MatDialogRef<DispatchComponent>) {
    this.credentials = {
      user_id: this.userService.user.getValue()['id'],
      password: '',
      username: this.userService.user.getValue()['username'],
    }

    this.userService.usernames.subscribe(usernames => {
      this.usernames = usernames
      if (usernames.length == 0) {
        this.userService.getUsernames()
      }
    })
  }


  ngOnInit() {
  }

  valid() {
    return this.credentials.password == this.confirm_password && this.credentials.username.length > 3 && !this.usernameUnavailable()
  }

  usernameUnavailable(){
    return this.usernames.includes(this.credentials.username) && this.credentials.username != this.userService.user.getValue()['username']
  }

  submit() {
    this.userService.updateLogin(this.credentials, () => {
      this.notification.credentialsUpdated()
      this.dialogRef.close()
    })
  }

}
