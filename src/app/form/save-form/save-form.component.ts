import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalService } from '../../service/global.service';
import { EntityService } from 'app/service/entity.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-save-form',
  templateUrl: './save-form.component.html',
  styleUrls: ['./save-form.component.scss']
})
export class SaveFormComponent implements OnInit {
  @Input() project: any;
  letter_types;
  in_types;
  form_max_date;

  entities = []
  filteredEntities = []

  loading = false;
  fc = new FormControl();

  constructor(private entityService: EntityService) {
    this.entityService.entities.subscribe(entities => {
      this.entities = entities
    })

    this.letter_types = GlobalService.letter_types;
    this.in_types = GlobalService.in_types;
    this.form_max_date = new Date();
  }

  filterEntities() {
    this.filteredEntities = this.entities.filter((entity) => {
      return entity.label.includes(this.project.sender) || entity.header.includes(this.project.sender)
    })
  }

  ngOnInit() {
    console.log(this.project);
  }

}
