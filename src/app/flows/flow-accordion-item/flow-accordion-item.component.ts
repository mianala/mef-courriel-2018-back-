import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'flow-accordion-item',
  templateUrl: './flow-accordion-item.component.html',
  styleUrls: ['./flow-accordion-item.component.scss']
})
export class FlowAccordionItemComponent implements OnInit {

  @Input() flow

  constructor() {
  }

  ngOnInit() {
  }

  decommissionable() {
    return true
  }
  shareable() {
    return true
  }
  answerable() {
    return true
  }

  treatable() {
    return true
  }

}
