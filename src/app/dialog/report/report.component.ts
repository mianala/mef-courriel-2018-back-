import {Component, OnInit} from '@angular/core';
import {FroalaService} from "../../froala.service";
import {UserService} from "../../user.service";
import {NotificationService} from "../../notification.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  options: any
  report: any
  user
  userConnection
  types

  constructor(private froalaService: FroalaService,
              private notification: NotificationService,
              private userService: UserService) {
    this.options = froalaService.getOptions()

    this.userConnection = this.userService.userObject.first().subscribe(user => {
      this.user = user
    })
    this.types = [
      {
        id: 2,
        content: 'RAPPORT DE MISSION'
      },
      {
        id: 3,
        content: 'RAPPORT DE REUNION/ATELIER'
      },
      {
        id: 4,
        content: 'RAPPORT DE FORMATION'
      }
    ]
    this.report = {}
  }

  ngOnInit() {
  }

  isReunion() {
    return this.report.type === 2
  }

  isFormation() {
    return this.report.type === 3
  }

  isMission() {
    return this.report.type === 4
  }

  valid() {
    console.log(this.report.title)
    if (!this.report.n_arrive || !this.report.n_arrive_dg) {
      return false
    }

    return true
  }

  submit() {
    if (!this.valid()) {
      this.notification.formError()
    } else {
      console.log(this.report)
    }
  }

  onDestroy() {
    this.userConnection.unsubscribe()
  }

}
