import { Component, OnInit, Input } from '@angular/core';
import { EntityService } from 'app/service/entity.service';

@Component({
  selector: 'sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss']
})
export class SenderComponent implements OnInit {
  entities = []
  filteredEntities = []

  @Input('sender') sender: string;

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
}
