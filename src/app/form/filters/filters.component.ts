import { Component, OnInit } from '@angular/core';
import { EntityService } from 'app/service/entity.service';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  entities = []
  constructor(private entityService: EntityService) {
    this.entityService.entities.subscribe(entities => {
      this.entities = entities
    })
  }

  ngOnInit() {
  }

}
