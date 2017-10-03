import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MdDialog} from '@angular/material';
import {SavedService} from '../../saved.service';
import {NotificationService} from '../../notification.service';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnInit {


  @Input() id
  @Input() type
  @Output() remove = new EventEmitter()

  constructor(public dialog: MdDialog,
              public userService: UserService,
              public savedService: SavedService,
              private notification: NotificationService) {
  }

  ngOnInit() {
  }

  removeMail() {
    this.userService.getActiveUser().subscribe(user => {
      this.savedService.removeSaved(this.id, user.id).subscribe(data => {
        console.log(data)
      })
    })

    this.notification.savedRemoved()
  }
}
