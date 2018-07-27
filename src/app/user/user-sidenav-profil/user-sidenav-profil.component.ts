import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-user-sidenav-profil',
  templateUrl: './user-sidenav-profil.component.html',
  styleUrls: ['./user-sidenav-profil.component.scss']
})
export class UserSidenavProfilComponent implements OnInit {

  user: any

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.user.subscribe(user=>{
      this.user = user
    })
  }

  logout() {
    this.userService.logout()
  }
}
