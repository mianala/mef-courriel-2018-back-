import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent implements OnInit {
  @Output() fileSelect = new EventEmitter()

  constructor() {
  }

  ngOnInit() {
  }

  selectFile(files) {
    let array = []
    for (let i = 0; i < files.length; i++) {
      array.push(files[i])
    }

    this.fileSelect.emit(array)
  }
}
