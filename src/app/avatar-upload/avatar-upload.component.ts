import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NotificationService} from '../service/notification.service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.scss']
})
export class AvatarUploadComponent implements OnInit {
  @Output() avatarSelected = new EventEmitter()
  photo = 'assets/images/default_user.png'

  constructor(private notification: NotificationService, private userService: UserService) {
    this.userService.user.subscribe(user => {
      this.photo = user['photo']
    })
  }

  ngOnInit() {
  }

  selectFile(file) {
    if ((file.type !== 'image/jpeg') && (file.type !== 'image/png')) {
      this.notification.notAnImage()
      return
    }
    if (file.size > 2000000) {
      this.notification.fileTooHeavy()
      return
    }


    const target = file.target || window.event.srcElement
    const files = target.files
    const fr = new FileReader();
    fr.onload = () => {
      this.photo = fr.result as string
    }

    fr.readAsDataURL(files[0])
    const reader = new FileReader();

    reader.onload = function (e) {
    }

    reader.readAsDataURL(file)
    this.avatarSelected.emit(file)
  }

}
