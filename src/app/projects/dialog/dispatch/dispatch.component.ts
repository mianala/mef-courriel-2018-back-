import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ProjectService } from '../../../service/project.service';
import { EntityService } from '../../../service/entity.service';
import { ThreadService } from '../../../service/thread.service';
import { GlobalService } from '../../../service/global.service';
import { NotificationService } from '../../../service/notification.service';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.scss']
})
export class DispatchComponent implements OnInit {
  options: any;
  thread: any;
  observations = GlobalService.observations;
  loading = false

  constructor(
    public notification: NotificationService,
    private projectService: ProjectService,
    private threadService: ThreadService,
    private dialogRef: MatDialogRef<DispatchComponent>) {

    this.thread = {
      receiver: '',
      content: '',
      files: [],
      checkedObservations: [],
      receivers: []
    };

    this.projectService.project.subscribe(project => {
      this.thread.project = project
    })
  }

  ngOnInit() {
  }


  toggleObservation(observation) {
    GlobalService.toggleInArray(this.thread.checkedObservations, observation)
  }


  updateReceiver(receivers) {
    this.thread.receiver = receivers.receiver
    this.thread.receivers = receivers.receivers
  }

  getFiles(files) {
    this.thread.files = this.thread.files.concat(files)
  }

  submit() {

    this.loading = true
    let obs = '';

    for (let o of this.thread.checkedObservations) {
      obs += ' - ' + o + '<br>'
    }

    this.thread.content = obs.concat(this.thread.content);

    //updating button into loading button
    this.threadService.dispatch(this.thread, () => {
      this.notification.threadDispatched()
      this.dialogRef.close()
    });
  }

  validReceiver() {
    return this.thread.receivers.length || this.thread.receiver.length > 2
  }

  validObservation(content) {
    if (content.length == 0) {
      this.notification.invalidObservation();
      return false
    }
    return true
  }

}

