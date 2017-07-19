import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {DialogWriteEmailComponent} from '../dialog-write-email/dialog-write-email.component';
import {EmailService} from "../email.service";

@Component({
  selector: 'app-dialog-write-to',
  templateUrl: './dialog-write-to.component.html',
  styleUrls: ['./dialog-write-to.component.scss']
})
export class DialogWriteToComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public user: any, private emailService: EmailService) {
  }
  ngOnInit() {
  }

  sendEmail(){
    this.emailService.sendEmail();
  }
}
