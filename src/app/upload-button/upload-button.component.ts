import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NotificationService} from "../service/notification.service";

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent implements OnInit {
  @Output() fileSelect = new EventEmitter()

  constructor(private notification: NotificationService) {
  }

  ngOnInit() {
  }

  selectFile(files) {
    let array = []
    for (let i = 0; i < files.length; i++) {
      let file = files[i]
      if (file.size > 100000000) {
        this.notification.fileTooHeavy()
        break
      }else{
        array.push(file)
      }
    }

    this.fileSelect.emit(array)
  }
}
