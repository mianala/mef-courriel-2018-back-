import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  credentials

  constructor(private userService: UserService) {
    this.credentials = {
      id: this.userService.user.getValue()['id']
    }
  }


  ngOnInit() {

  }

  submit() {
    this.userService.updateLogin(this.credentials)
  }

}
