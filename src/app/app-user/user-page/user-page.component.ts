import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {DialogWriteToComponent} from '../../dialog/dialog-write-to/dialog-write-to.component';
import {UserService} from '../../user.service';
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

  constructor(private userService: UserService, private route: ActivatedRoute, public dialog: MdDialog) {
    this.user = new User
  }

  writeTo() {
    const dialogWriteEmail = this.dialog.open(DialogWriteToComponent, {
        data: this.user
      })
    ;
    dialogWriteEmail.afterClosed().subscribe(result => {
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.getUser(params.id).subscribe(user => {
        this.user = user;
      });
    })
  }

}
