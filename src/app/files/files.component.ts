import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  @Input() files;
  @Output() fileRemoved = new EventEmitter;
  constructor() {
  }

  ngOnInit() {
  }

  remove(file) {
    if (file.id) {
      console.log(file)
      this.fileRemoved.emit(file)
    }

    this.files.splice(this.files.indexOf(file), 1)
  }

}
