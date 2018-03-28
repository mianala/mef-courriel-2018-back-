import {Component, OnInit} from '@angular/core';
import {FlowService} from "../../flow.service";

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {
  flow
  previousFlow

  constructor(private flowService: FlowService) {
    this.flow = {
      files:[]
    }

    flowService.flow.subscribe(flow => {
      this.previousFlow = flow
      console.log(this.previousFlow)
    })
  }

  ngOnInit() {
  }

  getFiles(files) {
    this.flow.files = this.flow.files.concat(files)
    this.flowService.ship(this.flow)
  }

  submit() {

  }
}
