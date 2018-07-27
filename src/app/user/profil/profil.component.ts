import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {EntityService} from '../../service/entity.service';
import {NotificationService} from '../../service/notification.service';
import {MatDialog} from '@angular/material';
import {UpdateComponent} from '../update/update.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  user
  entity

  constructor(private userService: UserService, private entityService: EntityService, private notification: NotificationService,
              public dialog: MatDialog) {
    userService.user.subscribe(user => {
      this.user = user
    })

    entityService.entity.subscribe(entity => {
      this.entity = entity
    })

  }

  openUpdateDialog(){
    this.dialog.open(UpdateComponent)
  }

  setAvatar(file) {
    this.userService.updateAvatar(file, () => {
      // userService.login(this.user.username,this.user.username,()=>{
      // })
        this.notification.avatarUpdated()
    })
  }

  ngOnInit() {
  }


}
