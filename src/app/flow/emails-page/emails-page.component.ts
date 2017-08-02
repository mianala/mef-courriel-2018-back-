import {Component, OnInit} from '@angular/core';
import {FlowService} from '../../flow.service';
import {Flow} from '../../../models/Flow';
import {UserService} from "../../user.service";
import {User} from "../../../models/User";
import {fadeInAnimation} from '../../animation/fadeIn'

@Component({
  selector: 'app-emails-page',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './emails-page.component.html',
  styleUrls: ['./emails-page.component.scss']
})
export class EmailsPageComponent implements OnInit {
  flows
  activeUser: User

  constructor(private flowService: FlowService, private userService: UserService) {
  }

  ngOnInit() {

    this.userService.getActiveUser().subscribe(data => {
      this.activeUser = data
      this.flowService.getFlows(this.activeUser.id).subscribe(result => {
        this.flows = result
      })
    })
  }
}
