import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  @Input() id
  @Input() type

  constructor() {
  }

  ngOnInit() {
  }

}
