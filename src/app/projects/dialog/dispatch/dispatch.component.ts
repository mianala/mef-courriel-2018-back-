import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FroalaService} from '../../../service/froala.service';
import {ProjectService} from '../../../service/project.service';
import {EntityService} from '../../../service/entity.service';
import {ThreadService} from "../../../service/thread.service";
import {GlobalService} from "../../../service/global.service";

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.scss']
})
export class DispatchComponent implements OnInit {
  options: any
  thread: any
  observations = GlobalService.observations
  entities

  constructor(private froalaService: FroalaService,
              private entityService: EntityService,
              private projectService: ProjectService,
              private threadService: ThreadService,
              private dialogRef: MatDialogRef<DispatchComponent>) {

    this.options = froalaService.getOptions()
    this.thread = {
      content: '',
      direction: 1,
      files: [],
      checkedObservations: [],
      receivers: []
    }

    this.entityService.downEntities.subscribe(entities => {
      this.entities = entities
    })
    this.projectService.project.subscribe(project => {
      this.thread.project = project
    })

  }

  ngOnInit() {
  }


  checkEntity(id) {
    this.toggleInArray(this.thread.receivers, id)
    console.log(this.thread.receivers)
  }

  toggleObservation(observation) {
    this.toggleInArray(this.thread.checkedObservations, observation)
  }


  getFiles(files) {
    this.thread.files = this.thread.files.concat(files)
  }

  submit() {
    let obs = ''

    for (let o of this.thread.checkedObservations) {
      obs += ' - ' + o + '<br>'
    }

    this.thread.content = obs.concat(this.thread.content)
    this.threadService.dispatch(this.thread)
    this.dialogRef.close()
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

}

