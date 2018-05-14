import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EnvService} from '../../service/env.service';

@Component({
  selector: 'be',
  templateUrl: './be.component.html',
  styleUrls: ['./be.component.scss']
})
export class BeComponent implements OnInit {
  count = '';
  be;
  title = '';
  @Output() onUpdate = new EventEmitter();

  constructor() {

    this.be = {
      sender: 'LE DIRECTEUR DE LA SYNTHESE BUDGETAIRE',
      receiver: 'Monsieur LE DIRECTEUR GENERAL DU BUDGET',
      counts: ['01'],
      titles: ['Compte rendu'],
    };
  }

  ngOnInit() {
    this.update()
  }


  validAttach() {
    return this.count.length && this.title.length
  }


  update() {
    this.onUpdate.emit(this.be)
  }

  addAttach() {

    if (!this.validAttach()) {
      return
    }

    this.be.titles.push(this.title)
    this.be.counts.push(this.count)

    this.title = ''
    this.count = ''

    this.update()
  }

  removeAttach(d) {
    const index = this.be.attached_files.indexOf(d);
    this.be.attached_files.splice(index, 1)

    this.update()
  }

}
