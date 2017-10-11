import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app'
  connected: boolean

  constructor(private userService: UserService,
              public router: Router) {

  }

  ngOnInit() {

    // todo wait for a little before redirecting

    this.userService.user.subscribe(
      user => {
        if (user.id) {
          this.connected = true
        } else {
          this.connected = false
        }
      })


    // todo user login
  }


}
