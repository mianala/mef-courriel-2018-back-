import {Component, OnInit} from '@angular/core';
import {FlowService} from "../../flow.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {
  be;
  title;
  count;
  flow;
  previousFlow;

  constructor(private flowService: FlowService,
              private router: Router) {
    this.be = {
      sender: 'LE DIRECTEUR DE LA SYNTHESE BUDGETAIRE',
      receiver_label: 'Monsieur LE DIRECTEUR GENERAL DU BUDGET',
      observation: 'En ayant l\'honneur de vous transmettre a titre de compte rendu',
      attached_files: [
        {title: 'Compte rendu', count: '02'},
        {title: 'Compte rendu', count: '02'},
        {title: 'Compte rendu', count: '02'},
        {title: 'Compte rendu', count: '02'},
      ]
    };

    this.flow = {
      files: []
    };

    flowService.flow.subscribe(flow => {
      this.previousFlow = flow;
      this.be.author = this.previousFlow.sender_entity_label
    })
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

  ngOnInit() {
  }

  preview() {
    this.be.numero = this.previousFlow.numero;
    this.flowService.be.next(this.be);
    this.router.navigateByUrl('/BE')
  }

  getFiles(files) {
    this.flow.files = this.flow.files.concat(files);
    this.flowService.ship(this.flow)
  }

  isBe() {
    if (this.flow.ship_for == 1) {
      return true
    }

    return false
  }

  submit() {
    if (this.isBe()) {

      this.flowService.shipWithBe(this.flow, this.be)
    } else {
      this.flowService.ship(this.flow)
    }
  }
}
