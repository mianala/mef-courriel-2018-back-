import {Component, OnInit} from '@angular/core'
import {UserService} from '../../user.service'
import {FlowService} from '../../flow.service'
import {EmailService} from '../../email.service'
import {ActivatedRoute} from '@angular/router'
import {User} from '../../../models/User'
import {fadeInAnimation} from '../../animation/fadeIn'
import {SavedService} from '../../saved.service';

@Component({
  selector: 'app-email-page',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './email-page.component.html',
  styleUrls: ['./email-page.component.scss']
})
export class EmailPageComponent implements OnInit {
  mails
  saved
  flowId: number
  starterUser: User
  receiverUser: User
  activeUser: any

  constructor(private userService: UserService,
              private savedService: SavedService,
              private route: ActivatedRoute, private flowService: FlowService, private emailService: EmailService) {

    this.route.params.subscribe(params => {
      this.flowId = params.id

    })
  }

  ngOnInit() {

    this.userService.userObject.subscribe(data => {
        this.activeUser = data

        this.flowService.getFlow(this.activeUser.id, this.flowId)
          .subscribe(flow => {
            if (flow.saved_id > 0) {
              this.savedService.getSaved(flow.saved_id).subscribe(saved => {
                this.saved = saved
              })
            }

            if (flow !== undefined) {
              if (flow.starter_id === this.activeUser.id) {
                this.starterUser = this.activeUser
                this.userService.getUser(flow.receiver_id).subscribe(user => {
                  this.receiverUser = user
                  this.getMails()
                })
              } else {
                this.receiverUser = this.activeUser
                this.userService.getUser(flow.starter_id).subscribe(user => {
                  this.starterUser = user
                  this.getMails()
                })
              }
            } else {
              console.log('Undefined flow, server issue')
            }
          })
      }
    )

  }

  getMails() {
    this.emailService.getEmails(this.flowId)
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].sentBy === 1) {
            data[i].user = this.receiverUser
          } else {
            data[i].user = this.starterUser
          }
        }
        data.sort(function (b, a) {
          const c: any = new Date(a.date_created);
          const d: any = new Date(b.date_created);
          return c - d;
        });
        this.mails = data
      })

  }

}
