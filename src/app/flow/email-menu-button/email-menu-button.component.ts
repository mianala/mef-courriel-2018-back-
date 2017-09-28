import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MdDialog} from "@angular/material";
import {DialogTransferMailComponent} from "../../dialog/dialog-transfer-mail/dialog-transfer-mail.component";

@Component({
  selector: 'app-email-menu-button',
  templateUrl: './email-menu-button.component.html',
  styleUrls: ['./email-menu-button.component.scss']
})
export class EmailMenuButtonComponent implements OnInit {

  @Output() remove = new EventEmitter()
  @Input() id

  constructor() {
  }

  ngOnInit() {
  }

}
