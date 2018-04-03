import {Component, OnInit} from '@angular/core';
import {EntityService} from "../../entity.service";
import {MatDialogRef} from "@angular/material";
import {DispatchComponent} from "../../projects/dialog/dispatch/dispatch.component";
import {FlowService} from "../../flow.service";

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  flow
  entities

  constructor(private entityService: EntityService,
              private flowService: FlowService,
              public dialogRef: MatDialogRef<DispatchComponent>) {


    this.flow = {
      receivers: []
    }
    this.entityService.relativeEntities.subscribe(entities => {
      this.entities = entities

      entities.sort(function (b, a) {
        const c = a.entity;
        const d = b.entity;
        return c - d;
      });
    })
  }

  ngOnInit() {
  }

  checkEntity(id) {
    this.toggleInArray(this.flow.receivers, id)
  }

  // util
  toggleInArray(array, value) {
    const index = array.indexOf(value);

    if (index === -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }
  }

  submit() {
    let receivers = ''

    for (let o of this.flow.receivers) {
      receivers += ' - ' + o + '<br>'
    }

    this.flowService.share(this.flow)
    this.dialogRef.close()
  }

}
