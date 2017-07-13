import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) {
    userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  ngOnInit() {
  }

}
