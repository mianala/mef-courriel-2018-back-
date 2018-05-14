import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {fadeInAnimation} from '../../animation/fadeIn'
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  user: any;
  loading = false;

  constructor(private route: Router,
              private userService: UserService) {
    this.user = {
      id:'',
      password:'',
    };

    this.userService.user.subscribe(user => {
      if (user['id']) {
        this.route.navigateByUrl('/courriels')
      }
    })
  }

  valid(){
    return this.user.id.length && this.user.password.length
  }

  ngOnInit() {
  }

  submit() {
    this.loading = true;


    this.userService.login(this.user.id, this.user.password, () => {
        this.loading = false
      }
    )


  }

}
