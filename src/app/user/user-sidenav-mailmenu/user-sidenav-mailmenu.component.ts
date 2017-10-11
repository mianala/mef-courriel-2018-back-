import {Component, OnInit} from '@angular/core';
import {FlowService} from '../../flow.service';

@Component({
  selector: 'app-user-sidenav-mailmenu',
  templateUrl: './user-sidenav-mailmenu.component.html',
  styleUrls: ['./user-sidenav-mailmenu.component.scss']
})
export class UserSidenavMailmenuComponent implements OnInit {
  unseenflowCount: number

  constructor(flowService: FlowService) {
  }

  ngOnInit() {
  }

}
