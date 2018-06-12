import {Component, EventEmitter, OnInit, Output} from '@angular/core';


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
      // sender: 'LE DIRECTEUR DE LA SYNTHESE BUDGETAIRE',
      sender: '',
      // receiver: 'Monsieur LE DIRECTEUR GENERAL DU BUDGET',
      receiver: '',
      counts: [],
      // counts: ['01'],
      titles: [],
      // titles: ['Compte rendu'],
    };
  }

  ngOnInit() {
    this.update()
  }


  validAttach() {
    return this.count.length && this.title.length
  }


  update() {
    this.be.valid = this.valid()
    this.onUpdate.emit(this.be)
  }

  valid(){
    return this.be.sender.length > 2 && this.be.titles.length > 0 && this.be.receiver.length > 2
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

  removeAttach(id) {
    const index = this.be.titles.indexOf(id);
    this.be.titles.splice(index, 1)
    this.be.counts.splice(index, 1)

    this.update()
  }

}
