import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {Http} from "@angular/http";
import {NavigationStart, Router} from "@angular/router";
import {TestService} from "./test.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

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
              private router: Router,
              private http: Http) {


  }

  ngOnInit() {
    this.userService.userSubject.subscribe(
      e => {
        this.connected = e !== 'disconnected';
      })
  }


}
