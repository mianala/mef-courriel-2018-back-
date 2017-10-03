import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {NotificationService} from '../../notification.service';

@Component({
  selector: 'app-user-sidenav-profil',
  templateUrl: './user-sidenav-profil.component.html',
  styleUrls: ['./user-sidenav-profil.component.scss']
})
export class UserSidenavProfilComponent implements OnInit {

  user: any

  constructor(private notification: NotificationService,
              private userService: UserService) {

  }

  ngOnInit() {
    this.userService.userObject.subscribe(user => {
      this.user = user
    })
  }

  logout() {
    this.userService.logout()
  }
}
