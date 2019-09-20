import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalService } from 'app/service/global.service';

@Component({
  selector: 'app-dialog-file',
  templateUrl: './dialog-file.component.html',
  styleUrls: ['./dialog-file.component.scss']
})
export class DialogFileComponent implements OnInit {
  @Input() file;
  @Output() removeFile = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.file.ko = GlobalService.formatBytes(this.file.size)
  }

  remove() {
    this.removeFile.emit('');
  }
}
