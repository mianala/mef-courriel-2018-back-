import {Component, OnInit} from '@angular/core';
import {FlowService} from "../../service/flow.service";
import {Router} from "@angular/router";
import {DispatchComponent} from "../../projects/dialog/dispatch/dispatch.component";
import {MatDialogRef} from "@angular/material";

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
              private router: Router,
              private dialogRef: MatDialogRef<DispatchComponent>
  ) {
    this.be = {
      sender: 'LE DIRECTEUR DE LA SYNTHESE BUDGETAIRE',
      receiver_label: 'Monsieur LE DIRECTEUR GENERAL DU BUDGET',
      observation: 'En ayant l\'honneur de vous transmettre a titre de compte rendu',
      attached_files: [
        {title: 'Compte rendu', count: '01'},
      ]
    };

    this.flow = {
      ship_for: 3,
      receiver: '',
      files: [],
    };

    flowService.flow.subscribe(flow => {
      this.previousFlow = flow;
      this.flow.flow_id = flow['id']
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
    this.be.sender_header = this.previousFlow.sender_be_header;
    this.flowService.be.next(this.be);
    // window.open('http://localhost:4200/BE')
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

    this.dialogRef.close()
  }
}
