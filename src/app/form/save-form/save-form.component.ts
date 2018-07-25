import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlobalService} from '../../service/global.service';

@Component({
  selector: 'app-save-form',
  templateUrl: './save-form.component.html',
  styleUrls: ['./save-form.component.scss']
})
export class SaveFormComponent implements OnInit {
  @Input() project: any;
  @Output() onUpdate = new EventEmitter()
  letter_types;
  in_types;
  form_max_date

  loading = false;

  constructor() {
    this.letter_types = GlobalService.letter_types;
    this.in_types = GlobalService.in_types;
    this.form_max_date = new Date();

  }

  composed(){
    return this.project.composed == 1
  }

  ngOnInit() {
    console.log(this.project)
  }

  update() {
    this.onUpdate.emit(this.project)
  }

}
