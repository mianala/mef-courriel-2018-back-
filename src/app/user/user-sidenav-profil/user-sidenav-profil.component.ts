import {Component, OnInit} from '@angular/core';
import {UserService} from "../../user.service";
import {User} from "../../../models/User";

@Component({
  selector: 'app-user-sidenav-profil',
  templateUrl: './user-sidenav-profil.component.html',
  styleUrls: ['./user-sidenav-profil.component.scss']
})
export class UserSidenavProfilComponent implements OnInit {


  constructor(private user: User, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getActiveUser().subscribe(data => {
      this.user = data;
    });
  }

}
