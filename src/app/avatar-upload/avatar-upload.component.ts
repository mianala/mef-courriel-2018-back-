import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NotificationService} from '../notification.service';

@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.scss']
})
export class AvatarUploadComponent implements OnInit {
  @Output() avatarSelected = new EventEmitter()
  photo = 'assets/images/default_user.png'

  constructor(private notification: NotificationService) {
  }

  ngOnInit() {
  }

  selectFile(file) {
    if ((file.type !== 'image/jpeg') && (file.type !== 'image/png')) {
      this.notification.notAnImage()
      return
    }

    const reader = new FileReader();

    reader.onload = function (e) {
    }

    reader.readAsDataURL(file)
    this.avatarSelected.emit(file)
  }

}
