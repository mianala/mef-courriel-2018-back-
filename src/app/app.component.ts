import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { GlobalService } from './service/global.service';
import { Router } from '@angular/router';
import { FilterService } from './service/filter.service';
import { SocketService } from './service/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  sidenav_status;

  constructor(private userService: UserService, private socket: SocketService,
    private global: GlobalService) {
    this.sidenav_status = true;
    this.global.sidenav_status.subscribe(status => {
      this.sidenav_status = status
    })
  }

  ngOnInit() {

    // todo wait for a little before redirecting

    // todo user login
  }


}
