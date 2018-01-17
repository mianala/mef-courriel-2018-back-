import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FroalaService} from '../../../froala.service';
import {ProjectService} from '../../project.service';
import {EntityService} from '../../../entity.service';
import {ThreadService} from "../../../thread/thread.service";

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.scss']
})
export class DispatchComponent implements OnInit {
  options: any
  thread: any
  observations: any
  entities
  checkedObservations
  receivers

  constructor(private froalaService: FroalaService,
              private entityService: EntityService,
              private projectService: ProjectService,
              private threadService: ThreadService,
              private dialogRef: MatDialogRef<DispatchComponent>) {

    this.options = froalaService.getOptions()
    this.observations = this.projectService.observations
    this.receivers = []
    this.entityService.dgbEntities.subscribe(data => {
      this.entities = data
    })
    this.thread = {
      content: 'EN AYANT L\'HONNEUR DE VOUS TRANSMETTRE POUR NOTIFICATION',
      files: []
    }
  }

  checkEntity() {

  }

  ngOnInit() {
  }

  getFiles(files) {
    this.thread.files = this.thread.files.concat(files)
  }

  submit() {
    this.thread.receivers = this.receivers
    this.threadService.dispatch(this.thread)
  }

}

