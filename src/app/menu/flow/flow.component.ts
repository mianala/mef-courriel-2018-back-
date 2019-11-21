import { Component, Input, OnInit } from '@angular/core';
import { FilterService } from '../../service/filter.service';
import { EnvService } from '../../service/env.service';
import * as CryptoJS from 'crypto-js';
import { GlobalService } from 'app/service/global.service';

@Component({
  selector: 'flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {
  @Input() flow;
  types = GlobalService.suivi_types
  constructor() {
  }

  ngOnInit() {
  }

  arrow() {
    if (this.flow.type_id == 3) {
      return ''
    }
    if (this.flow.destination) {
      return 'arrow_downward'
    }
    if (this.flow.sender) {
      return 'arrow_downward'
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

    if (this.flow.type_id == 3) {
      return 'Signé'
    }
    if (this.flow.destination || this.flow.sender) {
      return ''
    } if (FilterService.downFlow(this.flow)) {
      // return 'arrow_downward'
      return 'Observation'
    } else if (FilterService.upFlow(this.flow)) {
      // return 'arrow_upward'
      return 'Contenu'
    }

  }

  openBe() {
    window.open(EnvService.ip() + '/app/be/' + CryptoJS.SHA1(this.flow.id.toString()))
  }

  up_label() {

    if (this.flow.type_id == 3) {
      return ''
    }

    if (this.flow.destination) {
      return this.flow.sender_entity_label
    }

    if (this.flow.sender) {
      return this.flow.sender
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

    if (this.flow.type_id == 3) {
      return ''
    }

    if (this.flow.destination) {
      return ''
    }
    if (this.flow.sender) {
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

    if (this.flow.type_id == 3) {
      return this.flow.entity_label

    } if (this.flow.sender) {
      return this.flow.entity_label
    }
    if (this.flow.destination) {
      return this.flow.destination
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

    if (this.flow.type_id == 3) {
      return ''
    }

    if (this.flow.destination) {
      return this.flow.n_depart
    }

    if (this.flow.sender) {
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
