import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {

  @Input() id
  @Input() type
  constructor() { }

  ngOnInit() {
  }

}
