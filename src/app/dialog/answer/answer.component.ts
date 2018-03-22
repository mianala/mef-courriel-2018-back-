import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {EntityService} from '../../entity.service';
import {ThreadService} from '../../thread/thread.service';
import {FroalaService} from '../../froala.service';
import {DispatchComponent} from '../../projects/dialog/dispatch/dispatch.component';
import {ProjectService} from '../../projects/project.service';
import {FlowService} from "../../flow.service";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  answer
  options
  entity

  constructor(private froalaService: FroalaService,
              private entityService: EntityService,
              private projectService: ProjectService,
              private flowService: FlowService,
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
      console.log(answerData)
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

  submit() {
    this.dialogRef.close()
    this.flowService.answerFlow(this.answer)
  }

}
