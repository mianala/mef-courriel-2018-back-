import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {FlowService} from "../flow.service";
import {EmailService} from "../email.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/User";

@Component({
  selector: 'app-email-page',
  templateUrl: './email-page.component.html',
  styleUrls: ['./email-page.component.scss']
})
export class EmailPageComponent implements OnInit {
  mails;
  flowId: number;
  starterUser: User;
  receiverUser: User;
  activeUser: User;

  constructor(private userService: UserService,
              private route: ActivatedRoute, private flowService: FlowService, private emailService: EmailService) {

    this.route.params.subscribe(params => {
      this.flowId = params.id;

    })
  }

  ngOnInit() {


    this.userService.getActiveUser().subscribe(data => {
      this.activeUser = data;
    });

    this.flowService.getFlow(this.flowId)
      .map(data => data[0])
      .subscribe(flow => {

        if (flow.starter_id === this.activeUser.id) {
          this.starterUser = this.activeUser;
          this.userService.getUser(flow.receiver_id).subscribe(user => {
            this.receiverUser = user;
            this.getMails();
          })
        } else {
          this.receiverUser = this.activeUser
          this.userService.getUser(flow.starter_id).subscribe(user => {
            this.starterUser = user;
            this.getMails();
          })
        }
      })
  }

  getMails() {
    this.emailService.getEmails(this.flowId)
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].sentBy === 1) {
            data[i].user = this.receiverUser;
          } else {
            data[i].user = this.starterUser;
          }
        }
        this.mails = data;
      })
  }

}
