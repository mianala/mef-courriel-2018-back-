import {Component, OnInit} from '@angular/core';
import {FlowService} from "../../flow.service";

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {
  be
  observations
  label
  number
  flow
  previousFlow

  constructor(private flowService: FlowService) {
    this.be = {}
    this.observations = []
    this.flow = {
      files: []
    }

    flowService.flow.subscribe(flow => {
      this.previousFlow = flow
      console.log(this.previousFlow)
    })
  }

  addObservation() {
    this.observations.push({
      label: this.label,
      number: this.number
    })
  }

  removeObservation(d) {
    const index = this.be.observaitons.indexOf(d)
    this.observations = this.observations.slice(index, 1)
  }

  ngOnInit() {
  }

  getFiles(files) {
    this.flow.files = this.flow.files.concat(files)
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

      // transfor, observations into a string

      let observations = ''

      for (let o of this.observations) {
        observations += o.label + '-' + o.numer + ','
      }
      this.flow.observations = observations

      this.flowService.shipWithBe(this.flow, this.be)
    } else {
      this.flowService.ship(this.flow)
    }
  }
}
