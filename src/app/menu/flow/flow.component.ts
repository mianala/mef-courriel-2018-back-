import {Component, Input, OnInit} from '@angular/core';
import {FilterService} from '../../service/filter.service';
import {EnvService} from '../../service/env.service';
import * as CryptoJS from 'crypto-js';

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

    if (FilterService.downFlow(this.flow)) {
      return 'arrow_downward'
    } else if (FilterService.upFlow(this.flow)) {
      return 'arrow_upward'
    } else {
      return 'arrow_forward'
    }

  }

  content_label() {

    if (FilterService.isShipped(this.flow)) {
      return 'Contenu'
    }
    if (FilterService.isImported(this.flow)) {
      return 'Contenu'
    }

    if (FilterService.downFlow(this.flow)) {
      // return 'arrow_downward'
      return 'Observation'
    } else if (FilterService.upFlow(this.flow)) {
      // return 'arrow_upward'
      return 'Contenu'
    } else {
      return ''
    }

  }

  openBe() {
    window.open(EnvService.ip() + '/app/be/' + CryptoJS.SHA1(this.flow.id.toString()))
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
