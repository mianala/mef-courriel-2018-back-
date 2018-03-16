import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-flow-accordion',
  templateUrl: './flow-accordion.component.html',
  styleUrls: ['./flow-accordion.component.scss']
})
export class FlowAccordionComponent implements OnInit {
  @Input() flows

  constructor() { }

  ngOnInit() {
  }

}
