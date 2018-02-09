import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {fadeInAnimation} from '../../animation/fadeIn'

@Component({
  selector: 'app-login-page',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  user: any

  constructor(private userService: UserService) {
    this.user = {}

  }

  ngOnInit() {
    this.userService.redirectIfConnected()
  }

  submit() {
    this.userService.redirectIfConnected()
    this.userService.login(this.user.id, this.user.password)
  }

}
