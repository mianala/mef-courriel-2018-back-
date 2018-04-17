import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {UserService} from '../../service/user.service';
import {FlowService} from '../../service/flow.service';
import {EmailService} from '../../service/email.service';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnInit {


  @Input() id
  @Input() type

  constructor(public dialog: MatDialog,
              public userService: UserService,
              public emailService: EmailService,
              public flowService: FlowService) {
  }

  ngOnInit() {
  }

  removeMail() {
    if (this.type === 'flow') {
      this.flowService.delete(this.id)
    } else if (this.type === 'email') {
      this.emailService.delete(this.id)
    }
  }
}
