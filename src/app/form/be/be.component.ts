import {Component, OnInit} from '@angular/core';
import {EnvService} from '../../service/env.service';

@Component({
  selector: 'app-be',
  templateUrl: './be.component.html',
  styleUrls: ['./be.component.scss']
})
export class BeComponent implements OnInit {
  count;
  be;
  title;

  constructor() {

    this.be = {
      sender: 'LE DIRECTEUR DE LA SYNTHESE BUDGETAIRE',
      receiver_label: 'Monsieur LE DIRECTEUR GENERAL DU BUDGET',
      attached_files: [
        {title: 'Compte rendu', count: '01'},
      ]
    };
  }

  ngOnInit() {
  }

  preview() {
    window.open(EnvService.ip() + '/app/be')
  }


  addAttach() {
    this.be.attached_files.push({
      title: this.title,
      count: this.count
    })
  }

  removeAttach(d) {
    const index = this.be.attached_files.indexOf(d);
    this.be.attached_files.splice(index, 1)
  }

}
