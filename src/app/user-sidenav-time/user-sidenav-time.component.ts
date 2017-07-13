import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-sidenav-time',
  templateUrl: './user-sidenav-time.component.html',
  styleUrls: ['./user-sidenav-time.component.scss']
})
export class UserSidenavTimeComponent implements OnInit {
  time: any;

  constructor() {
    this.startTime();
    this.loop();
  }

  ngOnInit() {
  }

  checkTime(i: any): any {
    if (i < 10) {
      i = '0' + i
    }
    ;  // add zero in front of numbers < 10
    return i;
  }

  startTime() {
    const today = new Date();
    const h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = this.checkTime(m);
    s = this.checkTime(s);
    this.time = h + ':' + m ;
  }

  private loop() {
    setInterval(() => {
      this.startTime()
    }, 30000);

  }

}
