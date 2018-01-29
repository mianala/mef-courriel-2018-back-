import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  @Input() file

  constructor() { }

  ngOnInit() {
    this.file.ko = Math.round(this.file.size / 1000) + ' Ko'
  }

  pdf() {
    if (this.file.mimetype === 'application/pdf') {
      return true
    } else {
      return false
    }
  }

  img() {
    if (this.file.mimetype === 'image/jpg') {
      return true
    } else {
      return false
    }
  }

  doc() {
    if (!this.pdf() && !this.img()) {
      return true
    } else {
      return false
    }
  }

}
