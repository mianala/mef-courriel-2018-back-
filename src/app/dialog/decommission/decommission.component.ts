import {Component, OnInit} from '@angular/core';
import {FlowService} from '../../service/flow.service';
import {MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';
import {EntityService} from '../../service/entity.service';
import {DispatchComponent} from '../../projects/dialog/dispatch/dispatch.component';
import {FroalaService} from '../../service/froala.service';

@Component({
  selector: 'app-decommission',
  templateUrl: './decommission.component.html',
  styleUrls: ['./decommission.component.scss']
})
export class DecommissionComponent implements OnInit {
  flow
  previousFlow
  entities
  options

  constructor(private entityService: EntityService,
              private froalaService: FroalaService,
              private flowService: FlowService,
              public dialogRef: MatDialogRef<DispatchComponent>) {

    this.options = froalaService.getOptions()

    this.flow = {
      content: ''
    }
    this.flowService.flow.subscribe(flow => {
      console.log(flow)
      this.previousFlow = flow
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

  submit() {
    this.flowService.decommission(this.flow, () => {

    })
    this.dialogRef.close()
  }
}
