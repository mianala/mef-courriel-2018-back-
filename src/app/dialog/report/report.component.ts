import {Component, OnInit} from '@angular/core';
import {FroalaService} from '../../service/froala.service';
import {NotificationService} from '../../service/notification.service';
import {UserService} from '../../service/user.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  options: any
  report: any
  user
  types = [
    {
      id: 2,
      content: 'RAPPORT DE MISSION - COMPTE RENDU'
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

  constructor(private froalaService: FroalaService,
              private userService: UserService,
              private dialogRef: MatDialogRef<ReportComponent>,
              private notification: NotificationService) {
    this.options = froalaService.getOptions()
    this.user = userService.user.getValue()

    this.report = {}
    this.report.files = []
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
    if (!this.report.type || !this.report.title) {
      return false
    }
    return true
  }

  getFiles(files) {
    this.report.files = this.report.files.concat(files)
  }

  submit() {
    if (!this.valid()) {
      this.notification.formError()
    } else {
      this.dialogRef.close()
    }
  }

}
