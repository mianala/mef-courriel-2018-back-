import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../../models/User';
import {fadeInAnimation} from '../../animation/fadeIn'

@Component({
  selector: 'app-users-page',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  users: User[] = []
  filteredUsers = []
  activeEntity
  masonryOptions = {
    fitWidth: true,
    resize: true,
  }

  constructor(private userService: UserService) {

  }

  filterUsers(entity) {

    if (this.activeEntity !== entity) {

      this.activeEntity = entity
      this.userService.getUsersByEntity(entity.label).subscribe(users => {
        this.users = this.filteredUsers = users;
      });
    }
  }

  ngOnInit() {
    this.userService.getUsersByEntity('DGB').subscribe(users => {
      this.users = this.filteredUsers = users;
    });
  }

}
