import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {ProjectService} from '../../../service/project.service';
import {EntityService} from '../../../service/entity.service';
import {ThreadService} from '../../../service/thread.service';
import {GlobalService} from '../../../service/global.service';
import {NotificationService} from '../../../service/notification.service';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.scss']
})
export class DispatchComponent implements OnInit {
  options: any;
  thread: any;
  observations = GlobalService.observations;
  downEntities;
  upEntities;
  relativeEntities;
  active_index = 0;
  loading = false
  receiver = ''

  constructor(
              private entityService: EntityService,
              public notification: NotificationService,
              private projectService: ProjectService,
              private threadService: ThreadService,
              private dialogRef: MatDialogRef<DispatchComponent>) {

    this.thread = {
      content: '',
      files: [],
      checkedObservations: [],
      receivers: []
    };

    this.projectService.project.subscribe(project => {
      this.thread.project = project
    })

    this.entityService.downEntities.subscribe(s => {
      this.downEntities = s
    })

    this.entityService.relativeEntities.subscribe(s => {
      this.relativeEntities = s
    })

    this.entityService.upEntities.subscribe(s => {
      this.upEntities = s
    })

  }

  ngOnInit() {
  }

  checkEntity(id) {
    GlobalService.toggleInArray(this.thread.receivers, id);
    console.log(this.thread.receivers)
  }

  toggleObservation(observation) {
    GlobalService.toggleInArray(this.thread.checkedObservations, observation)
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
    return this.thread.receivers.length
  }

  validObservation(content) {
    if (content.length == 0) {
      this.notification.invalidObservation();
      return false
    }
    return true
  }


  indexChanged(event) {
    this.active_index = event.index
  }
}

