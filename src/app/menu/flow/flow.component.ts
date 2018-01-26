import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {
  @Input() flow
  constructor() { }

  ngOnInit() {
    this.flow.thread.type = 'down'
  }

}
