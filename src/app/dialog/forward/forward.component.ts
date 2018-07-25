import {Component, OnInit} from '@angular/core';
import {EntityService} from "../../service/entity.service";
import {MatDialogRef} from "@angular/material";
import {DispatchComponent} from "../../projects/dialog/dispatch/dispatch.component";
import {FlowService} from "../../service/flow.service";
import {NotificationService} from '../../service/notification.service';

@Component({
  selector: 'app-forward',
  templateUrl: './forward.component.html',
  styleUrls: ['./forward.component.scss']
})
export class ForwardComponent implements OnInit {
  flow
  entities

  constructor(private entityService: EntityService,
              private notificationService:NotificationService,
              private flowService: FlowService,
              public dialogRef: MatDialogRef<DispatchComponent>) {
    this.flow = {
      id:0,
      receivers: []
    }

    this.flowService.flow.subscribe(f => {
      this.flow.id = f['id']
    })
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

    this.flowService.forward(this.flow,()=>{
      this.flowService.getAllFlows()
      this.notificationService.flowForwarded()
    })
    this.dialogRef.close()
  }

}
