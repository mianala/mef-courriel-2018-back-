import {Component, OnInit} from '@angular/core';
import {EntityService} from "../../entity.service";
import {ThreadService} from "../../thread/thread.service";
import {MatDialogRef} from "@angular/material";
import {DispatchComponent} from "../../projects/dialog/dispatch/dispatch.component";

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  thread
  entities

  constructor(private entityService: EntityService,
              private threadService: ThreadService,
              public dialogRef: MatDialogRef<DispatchComponent>) {


    this.thread = {
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
    this.toggleInArray(this.thread.receivers, id)
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
    let obs = ''

    for (let o of this.thread.checkedObservations) {
      obs += ' - ' + o + '<br>'
    }

    this.threadService.dispatch(this.thread)
    this.dialogRef.close()
  }

}
