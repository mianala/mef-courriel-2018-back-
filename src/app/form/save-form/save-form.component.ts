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
  @Output() updated: EventEmitter<any> = new EventEmitter()
  letter_types;
  in_types;
  form_max_date;

  filteredEntities = []

  loading = false;
  fc = new FormControl();

  constructor(private entityService: EntityService) {

    this.letter_types = GlobalService.letter_types;
    this.in_types = GlobalService.in_types;
    this.form_max_date = new Date();
  }

  ngOnInit() {
    console.log(this.project);
  }

  up() {
    this.updated.emit(this.project)
  }
  updatedSender(sender){
    this.project.sender = sender
  }
}
