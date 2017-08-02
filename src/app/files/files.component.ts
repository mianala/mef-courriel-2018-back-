import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  @Input() files


  constructor() {
  }

  ngOnInit() {
  }

  remove(file) {
    this.files.splice(this.files.indexOf(file), 1)
  }

}
