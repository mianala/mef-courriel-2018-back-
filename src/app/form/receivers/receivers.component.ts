import { Component, OnInit, Input } from '@angular/core';
import { EntityService } from 'app/service/entity.service';
import { GlobalService } from 'app/service/global.service';

@Component({
  selector: 'receivers',
  templateUrl: './receivers.component.html',
  styleUrls: ['./receivers.component.scss']
})
export class ReceiversComponent implements OnInit {
  @Input('receiver') receiver: string;

  // todo: fix this bcs this does'nt work
  @Input('receivers') receivers: any;
  active_index = 0;
  downEntities;
  upEntities;
  relativeEntities;
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


  indexChanged(event) {
    this.active_index = event.index
  }
  checkEntity(id) {
    GlobalService.toggleInArray(this.receivers, id);
  }
}
