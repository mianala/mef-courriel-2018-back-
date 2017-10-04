import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MdDialog} from '@angular/material';
import {SavedService} from '../../saved.service';
import {NotificationService} from '../../notification.service';
import {UserService} from '../../user.service';
import {FlowService} from "../../flow.service";

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
              public flowService: FlowService) {
  }

  ngOnInit() {
  }

  removeMail() {
    if (this.type === 'flow') {
      this.flowService.deleteFlow(this.id)
    } else if (this.type === 'email') {
      this.flowService.deleteFlow(this.id)
    } else {
      this.savedService.removeSaved(this.id)
    }
  }
}
