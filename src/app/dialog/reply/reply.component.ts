import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {EntityService} from '../../service/entity.service';
import {ThreadService} from '../../service/thread.service';
import {FroalaService} from '../../service/froala.service';
import {DispatchComponent} from '../../projects/dialog/dispatch/dispatch.component';
import {ProjectService} from '../../service/project.service';
import {FlowService} from "../../service/flow.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  answer
  options
  entity

  constructor(private froalaService: FroalaService,
              private entityService: EntityService,
              private projectService: ProjectService,
              private flowService: FlowService,
              private notification: NotificationService,
              private threadService: ThreadService,
              private dialogRef: MatDialogRef<DispatchComponent>) {
    this.answer = {
      flow_id: '0',
      entity_id: '0',
      files: [],
      content: ''
    }

    this.entity = this.entityService.entity.getValue()
    this.flowService.answerData.subscribe(answerData => {
      this.answer.flow_id = answerData['flow_id']
      this.answer.entity_id = answerData['entity_id']
    })

    this.options = froalaService.getOptions()
  }

  ngOnInit() {
  }


  getFiles(files) {
    this.answer.files = this.answer.files.concat(files)
  }

  valid() {
    return this.answer.content.length > 3
  }

  submit() {

    if (!this.valid()) {
      this.notification.invalidObservation()
      return
    }


    //update button into loading button
    this.flowService.answerFlow(this.answer, () => {
      this.notification.answered()
      this.dialogRef.close()
    })
  }

}
