import {Component} from '@angular/core';
import {UserService} from "./user.service";
import {Http} from "@angular/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app'
  connected: boolean

  constructor(private userService: UserService, private http: Http) {

    userService.getActiveUser()
      .subscribe(result => {
        if (result) {
          this.connected = true
        }
      })
  }

}
