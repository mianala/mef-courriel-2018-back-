import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {DialogWriteToComponent} from '../dialog-write-to/dialog-write-to.component';
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/User";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  private userSub: any;

  constructor(private user: User, private userService: UserService, private route: ActivatedRoute, public dialog: MdDialog) {
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
