import {Component, OnInit} from '@angular/core';
import {UserService} from "../../user.service";
import {User} from "../../../models/User";
import {NotificationService} from "../../notification.service";

@Component({
  selector: 'app-user-sidenav-profil',
  templateUrl: './user-sidenav-profil.component.html',
  styleUrls: ['./user-sidenav-profil.component.scss']
})
export class UserSidenavProfilComponent implements OnInit {


  constructor(private user: User, private notification: NotificationService, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getActiveUser().subscribe(data => {
      this.user = data;
    });
  }

  logout() {
    this.userService.logout().subscribe(result => {
      this.userService.redirectIfConnected()
      this.notification.loggedOut()
    })
  }

}
