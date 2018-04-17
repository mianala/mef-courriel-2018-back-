import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/User';
import {fadeInAnimation} from '../../animation/fadeIn'

@Component({
  selector: 'app-user-page',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  user: User

  constructor(private userService: UserService, private route: ActivatedRoute, public dialog: MatDialog) {
    this.user = new User
  }

  writeTo() {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.getUser(params.id).subscribe(user => {
        this.user = user;
      });
    })
  }

}
