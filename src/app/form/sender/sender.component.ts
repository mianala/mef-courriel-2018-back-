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
      return entity.label.toLowerCase().includes(this.sender.toLowerCase()) || entity.header.toLowerCase().includes(this.sender.toLowerCase())
    })
  }

  up() {
    this.filterEntities()
    this.updated.emit(this.sender)
  }
}
