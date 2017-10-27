import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {NotificationService} from '../../notification.service';
import {SavedService} from '../../saved.service';
import {FroalaService} from '../../froala.service';
import {MatDialogRef} from "@angular/material";


@Component({
  selector: 'app-dialog-save-mail',
  templateUrl: './dialog-save-mail.component.html',
  styleUrls: ['./dialog-save-mail.component.scss']
})
export class DialogSaveMailComponent implements OnInit {
  saved: any
  options: any
  user: any

  constructor(private froalaService: FroalaService,
              private dialogRef: MatDialogRef<DialogSaveMailComponent>,
              private userService: UserService,
              private notification: NotificationService,
              private savedService: SavedService) {
    this.saved = {
      content: ''
    }

    this.saved.files = []
    this.user = this.userService.user.getValue();
    this.options = froalaService.getOptions()
  }

  ngOnInit() {

  }

  valid() {
    console.log(this.saved.n_arrive)
    if (!this.saved.n_arrive || !this.saved.n_arrive_dg) {
      return false
    }

    return true
  }

  getFiles(files) {
    this.saved.files = this.saved.files.concat(files)
  }

  submit() {
    if (!this.valid()) {
      this.notification.formError()
    } else {
      this.saved.user = this.user
      this.savedService.save(this.saved)
      this.notification.emailSaved();
      this.dialogRef.close()
    }
  }

}
