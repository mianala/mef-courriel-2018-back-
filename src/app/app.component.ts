import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {Http} from "@angular/http";
import {NavigationStart, Router} from "@angular/router";
import {TestService} from "./test.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {SocketService} from "./service/socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app'
  connected: boolean

  constructor(private test: TestService,
              private userService: UserService,
              private socketService: SocketService,
              public router: Router,
              private http: Http) {

    this.socketService.io.on('email', email => {
      console.log(email)
    })
  }

  ngOnInit() {

    // todo wait for a little before redirecting

    this.userService.userSubject.subscribe(
      e => {
        this.connected = e !== 'disconnected';

        if (!this.connected) {
          this.router.navigateByUrl('/public')
        }
      })


    // todo user login
  }


}
