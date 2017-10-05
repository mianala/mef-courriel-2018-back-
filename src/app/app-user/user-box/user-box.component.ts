import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.scss']
})
export class UserBoxComponent implements OnInit {
  @Input() user;

  constructor() {
  }

  ngOnInit() {
  }

  setUser(id) {

  }

}
