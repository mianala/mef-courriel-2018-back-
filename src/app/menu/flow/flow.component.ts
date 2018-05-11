import {Component, Input, OnInit} from '@angular/core';
import {FilterService} from '../../service/filter.service';

@Component({
  selector: 'flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {
  @Input() flow;

  constructor() {
  }

  ngOnInit() {
  }

  arrow() {

    if (FilterService.isShipped(this.flow)) {
      return 'arrow_backward'
    }
    if (FilterService.isImported(this.flow)) {
      return 'arrow_forward'
    }

    if (this.flow.entity.length == this.flow.sender_entity.length) {
      return 'arrow_forward'
    } else if (this.flow.entity.length > this.flow.sender_entity.length) {
      return 'arrow_downward'
    } else if (this.flow.entity.length < this.flow.sender_entity.length) {
      return 'arrow_upward'
    }

  }

  up_label() {

    if (FilterService.isShipped(this.flow) || FilterService.isImported(this.flow)) {
      return this.flow.destination

    }

    // if
    if (this.flow.sender_entity.length > 0 && this.flow.entity.length > 0) {
      if (this.flow.sender_entity.length == this.flow.entity.length) {
        return this.flow.sender_entity_label
      } else {
        return this.flow.sender_entity.length < this.flow.entity.length ? this.flow.sender_entity_label : this.flow.entity_label
      }
    } else {
      return this.flow.destination
    }
  }

  up_n() {


    if (FilterService.isShipped(this.flow) || FilterService.isImported(this.flow)) {
      return ''
    }

    // if
    if (this.flow.sender_entity.length > 0 && this.flow.entity.length > 0) {
      if (this.flow.sender_entity.length == this.flow.entity.length) {
        return this.flow.n_depart
      } else {
        return this.flow.sender_entity.length < this.flow.entity.length ? this.flow.n_depart : this.flow.n_arrive
      }
    }
  }

  down_label() {

    if (FilterService.isShipped(this.flow)) {
      return this.flow.sender_entity_label
    }
    if (FilterService.isImported(this.flow)) {
      return this.flow.entity_label
    }
    // if
    if (this.flow.sender_entity.length > 0 && this.flow.entity.length > 0) {
      if (this.flow.sender_entity.length == this.flow.entity.length) {
        return this.flow.entity_label
      } else {
        return this.flow.sender_entity.length > this.flow.entity.length ? this.flow.sender_entity_label : this.flow.entity_label
      }
    } else {
      return this.flow.sender_entity_label || this.flow.entity_label
    }
  }

  down_n() {

    if (FilterService.isShipped(this.flow)) {
      return this.flow.n_depart
    }
    if (FilterService.isImported(this.flow)) {
      return this.flow.n_arrive
    }
    // if
    if (this.flow.sender_entity.length > 0 && this.flow.entity.length > 0) {
      if (this.flow.sender_entity.length == this.flow.entity.length) {
        return this.flow.n_arrive
      } else {
        return this.flow.sender_entity.length > this.flow.entity.length ? this.flow.n_depart : this.flow.n_arrive
      }
    } else {
      return ''
    }
  }


}
