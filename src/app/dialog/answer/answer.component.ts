import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {EntityService} from '../../entity.service';
import {ThreadService} from '../../thread/thread.service';
import {FroalaService} from '../../froala.service';
import {DispatchComponent} from '../../projects/dialog/dispatch/dispatch.component';
import {ProjectService} from '../../projects/project.service';
import {MessageService} from "../../message.service";
import {UserService} from "../../user.service";
import {FlowService} from "../../flow.service";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  message
  options
  entity

  constructor(private froalaService: FroalaService,
              private entityService: EntityService,
              private projectService: ProjectService,
              private flowService: FlowService,
              private threadService: ThreadService,
              private messageService: MessageService,
              private dialogRef: MatDialogRef<DispatchComponent>) {
    this.message = {
      flow_id: '0',
      entity_id: '0',
      files: [],
      content: ''
    }

    this.entity = this.entityService.entity.getValue()
    this.messageService.messageData.subscribe(messageData => {
      console.log(messageData)
      this.message.flow_id = messageData['flow_id']
      this.message.entity_id = messageData['entity_id']
    })

    this.options = froalaService.getOptions()
  }

  ngOnInit() {
  }


  getFiles(files) {
    this.message.files = this.message.files.concat(files)
  }

  submit() {
    this.dialogRef.close()
    this.messageService.send(this.message)
  }

}
