import { Component, OnInit } from '@angular/core';
import { EntityService } from 'app/service/entity.service';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {
  up: any = []
  down: any = []
  relatives: any = []
  constructor(private entityService: EntityService) {
    this.entityService.downEntities.subscribe(d => {
      this.down = d
    })
    this.entityService.upEntities.subscribe(d => {
      this.up = d
    })
    this.entityService.relativeEntities.subscribe(d => {
      this.relatives = d
    })
  }

  ngOnInit() {
  }

}
