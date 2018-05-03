import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
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
  loading:boolean

  constructor(private userService: UserService) {
    this.user = {}
    this.loading = false
  }

  ngOnInit() {
    this.userService.redirectIfConnected()
  }

  submit() {
    this.loading = true
    this.userService.login(this.user.id, this.user.password, () => {
        this.loading = false
      }
    )
  }

}
