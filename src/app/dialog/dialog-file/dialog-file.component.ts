import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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
  }

  remove() {
    this.removeFile.emit('');
  }
}
