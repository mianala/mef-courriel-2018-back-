import {Component, Input, OnInit} from '@angular/core';
import { GlobalService } from 'app/service/global.service';

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  @Input() file

  constructor() { }

  ngOnInit() {
    this.file.ko = GlobalService.formatBytes(this.file.size)
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
