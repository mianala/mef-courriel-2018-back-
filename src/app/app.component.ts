import {Component} from '@angular/core';
import {UserService} from "./user.service";
import {Http} from "@angular/http";
import {NavigationStart, Router} from "@angular/router";
import {TestService} from "./test.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app'
  connected: boolean

  constructor(private test: TestService,
              private userService: UserService,
              private router: Router,
              private http: Http) {
    router.events.subscribe(event => {
        userService.isConnected(result => {
          this.connected = result

        })
      }
    )
    userService.isConnected(result => {
      this.connected = result
      if (!this.connected) {
        this.router.navigateByUrl('/public')
      } else {
      }
    })

  }


}
