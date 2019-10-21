import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntityService } from 'app/service/entity.service';

@Component({
  selector: 'sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss']
})
export class SenderComponent implements OnInit {
  entities = []
  filteredEntities = []
  sender = ''
  @Output() updated: EventEmitter<any> = new EventEmitter()

  constructor(private entityService: EntityService) {
    this.entityService.entities.subscribe(entities => {
      this.filteredEntities = this.entities = entities
    })
  }

  ngOnInit() {
  }

  filterEntities() {

    this.filteredEntities = this.entities.filter((entity) => {
      let filter = false
      filter = filter || entity.label.toLowerCase().includes(this.sender.toLowerCase())
      if (entity.header) {
        filter = filter || entity.header.toLowerCase().includes(this.sender.toLowerCase())
      }
      return filter
    })
  }

  up() {
    this.filterEntities()
    this.updated.emit(this.sender)
  }
}
