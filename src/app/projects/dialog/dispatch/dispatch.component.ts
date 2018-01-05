import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FroalaService} from '../../../froala.service';
import {ProjectService} from '../../project.service';
import {EntityService} from '../../../entity.service';

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

  constructor(private froalaService: FroalaService,
              private entityService: EntityService,
              private projectService: ProjectService,
              private dialogRef: MatDialogRef<DispatchComponent>) {
    this.options = froalaService.getOptions()
    this.observations = this.projectService.observations

    this.entityService.dgbEntities.subscribe(data => {
      this.entities = data
    })
    this.thread = {
      content: 'EN AYANT L\'HONNEUR DE VOUS TRANSMETTRE POUR NOTIFICATION'
    }
  }

  ngOnInit() {
  }

  getFiles() {
  }

  submit() {
  }

}

