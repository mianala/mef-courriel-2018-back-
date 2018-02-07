import {Component, OnInit} from '@angular/core';
import {EntityService} from "../../entity.service";

@Component({
  selector: 'app-entity-page',
  templateUrl: './entity-page.component.html',
  styleUrls: ['./entity-page.component.scss']
})
export class EntityPageComponent implements OnInit {
  entity

  constructor(private entityService: EntityService) {
    this.entityService.entity.subscribe(entity => {
      this.entity = entity
    })
  }

  ngOnInit() {
  }

}
