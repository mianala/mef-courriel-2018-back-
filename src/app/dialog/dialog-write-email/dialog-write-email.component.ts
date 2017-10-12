import {Component, OnInit} from '@angular/core'
import {UserService} from '../../user.service'
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
  user: any

  constructor(private flowService: FlowService,
              private froala: FroalaService,
              private userService: UserService) {
    this.mail = {
      title: '',
      content: ''
    }
    this.mail.files = []
    this.options = this.froala.getOptions()
  }

  ngOnInit() {
    this.user = this.userService.user.getValue()
  }

  sendEmail() {
    this.mail.user = this.user
    this.mail.savedId = 0
    this.flowService.start(this.mail)
  }

  getFiles(files) {
    this.mail.files = this.mail.files.concat(files)
  }

  selectUser(user) {
    this.user = user
  }

}
