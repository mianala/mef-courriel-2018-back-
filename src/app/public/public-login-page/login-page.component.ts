import {Component, OnInit} from '@angular/core';
import {UserService} from "../../user.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  id: string;
  password: string;

  constructor(private userService: UserService) {
    this.id = '';
    this.password = '';
  }

  ngOnInit() {
    this.userService.login('id', 'pass')
  }

  login() {
    this.userService.login(this.id, this.password)
  }

}
