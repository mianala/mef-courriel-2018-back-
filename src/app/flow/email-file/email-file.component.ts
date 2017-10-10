import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'app-email-file',
  templateUrl: './email-file.component.html',
  styleUrls: ['./email-file.component.scss']
})
export class EmailFileComponent implements OnInit {
  @Input() file

  constructor() {
  }

  ngOnInit() {
    this.file.ko = Math.round(this.file.size / 1000) + ' Ko'
  }

  pdf() {
    if (this.file.extension === 'pdf') {
      return true
    } else {
      return false
    }
  }

  img() {
    if (this.file.extension === 'jpg') {
      return true
    } else {
      return false
    }
  }

  doc() {
    if (this.file.extension !== 'jpg' && this.file.extension != 'pdf') {
      return true
    } else {
      return false
    }
  }

}
