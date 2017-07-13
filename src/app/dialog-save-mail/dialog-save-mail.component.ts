import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-dialog-save-mail',
  templateUrl: './dialog-save-mail.component.html',
  styleUrls: ['./dialog-save-mail.component.scss']
})
export class DialogSaveMailComponent implements OnInit {

  constructor(private user: User, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getActiveUser().subscribe(data => {
      this.user = data;
    })
  }

}
