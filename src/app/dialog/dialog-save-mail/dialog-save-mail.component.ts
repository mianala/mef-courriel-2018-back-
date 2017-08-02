import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {User} from '../../../models/User';
import {NotificationService} from "../../notification.service";
import {SavedService} from "../../saved.service";
import {FroalaService} from "../../froala.service";

@Component({
  selector: 'app-dialog-save-mail',
  templateUrl: './dialog-save-mail.component.html',
  styleUrls: ['./dialog-save-mail.component.scss']
})
export class DialogSaveMailComponent implements OnInit {
  saved: any
  options: any

  constructor(private user: User,
              private froalaService: FroalaService,
              private notification: NotificationService,
              private userService: UserService,
              private savedService: SavedService)
  {
    this.userService.getActiveUser().subscribe(data => {
      this.user = data;
    })
    this.saved = {}
    this.options = froalaService.getOptions()
    this.saved.files = []
  }

  ngOnInit() {

  }

  getFiles(files) {
    this.saved.files = this.saved.files.concat(files)
  }

  saveEmail() {
    this.saved.user = this.user
    this.savedService.save(this.saved)
    this.notification.emailSaved();
  }

}
