import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {fadeInAnimation} from '../../animation/fadeIn'
import {Router} from '@angular/router';
import {NotificationService} from '../../notification.service';

@Component({
  selector: 'app-login-page',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  user: any

  constructor(private notification: NotificationService, private router: Router, private userService: UserService) {
    this.user = {}

    this.userService.user.subscribe((data) => {
      console.log('login page')
      console.log(data)
    })
  }

  ngOnInit() {
  }

  submit() {



    this.userService.redirectIfConnected()
    this.userService.login(this.user.id, this.user.password).subscribe(user => {
      this.notification.connected()
      this.router.navigateByUrl('/courriels')
      this.userService.redirectIfConnected()
    })



  }

}
