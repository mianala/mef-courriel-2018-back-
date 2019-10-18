import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntityService } from 'app/service/entity.service';
import { GlobalService } from 'app/service/global.service';

@Component({
  selector: 'receivers',
  templateUrl: './receivers.component.html',
  styleUrls: ['./receivers.component.scss']
})
export class ReceiversComponent implements OnInit {

  // todo: fix this bcs this does'nt work

  @Output() updated: EventEmitter<any> = new EventEmitter()
  receivers = {
    receivers: [],
    receiver: ''
  }
  active_index = 0;
  downEntities: any[];
  upEntities: {};
  relativeEntities: any[];
  constructor(
    private entityService: EntityService,
  ) {


  }

  ngOnInit() {

    this.entityService.downEntities.subscribe(s => {
      this.downEntities = s
    })

    this.entityService.relativeEntities.subscribe(s => {
      this.relativeEntities = s
    })

    this.entityService.upEntities.subscribe(s => {
      this.upEntities = s
    })

  }


  indexChanged(event: { index: number; }) {
    this.active_index = event.index
  }
  checkEntity(id: any) {
    this.emit()
    GlobalService.toggleInArray(this.receivers.receivers, id);
  }

  emit() {
    this.updated.emit(this.receivers)
  }
}
