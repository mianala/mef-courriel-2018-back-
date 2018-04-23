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
    return this.file.mimetype === 'application/pdf';
  }

  img() {
    return this.file.mimetype === 'image/jpg';
  }

  doc() {
    return !this.pdf() && !this.img();
  }

}
