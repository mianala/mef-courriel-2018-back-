import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {
  @Input() type
  thread = {}

  constructor() {

  }

  ngOnInit() {
  }

}
