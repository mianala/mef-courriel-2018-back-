import {Component, OnInit} from '@angular/core'
import {UserService} from '../../user.service'
import {User} from '../../../models/User'
import {FlowService} from '../../flow.service'
import {FroalaService} from '../../froala.service'

@Component({
  selector: 'app-dialog-write-email',
  templateUrl: './dialog-write-email.component.html',
  styleUrls: ['./dialog-write-email.component.scss']
})
export class DialogWriteEmailComponent implements OnInit {
  mail: any
  options: any

  constructor(private user: User, private flowService: FlowService,
              private froala: FroalaService,
              private userService: UserService) {
    this.mail = {}
    this.userService.getActiveUser().subscribe(activeUser => {
      this.mail.starter = activeUser
    })
    this.mail.files = []
    this.options = this.froala.getOptions()
  }

  ngOnInit() {
    this.userService.getActiveUser().subscribe(data => {
      this.user = data
    })
  }

  sendEmail() {
    this.mail.receiver = this.user
    this.mail.savedId = 0
    this.flowService.startFlow(this.mail)
  }

  getFiles(files) {
    this.mail.files = this.mail.files.concat(files)
  }

  selectUser(user) {
    this.user = user
  }

}
