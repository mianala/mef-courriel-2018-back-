import {Component, OnInit} from '@angular/core';
import {FlowService} from '../../service/flow.service';
import {Router} from '@angular/router';
import {DispatchComponent} from '../../projects/dialog/dispatch/dispatch.component';
import {MatDialogRef} from '@angular/material';
import {ProjectService} from '../../service/project.service';
import {EnvService} from '../../service/env.service';
import {NotificationService} from '../../service/notification.service';
import {GlobalService} from '../../service/global.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {
  project;
  flow;
  loading = false;
  ship_types = GlobalService.ship_types;

  constructor(private flowService: FlowService,
              private projectService: ProjectService,
              private router: Router,
              private notification: NotificationService,
              private dialogRef: MatDialogRef<DispatchComponent>) {

    this.flow = {
      ship_for: 0,
      receiver: '',
      content: 'Compte rendu',
      sender_entity_id: 21,
      files: [],
    };

    projectService.project.subscribe(project => {
      this.project = project;
      this.flow.project_id = project['id']
      this.flow.sender_entity_id = project['entity_id']
    })


  }

  ngOnInit() {
  }

  getFiles(files) {
    this.flow.files = this.flow.files.concat(files);
  }

  isBe() {
    return this.flow.ship_for == 1;
  }

  valid() {
    return this.flow.receiver.length > 3 && this.flow.content.length > 3
  }

  submit() {

    this.loading = true

    if (!this.valid()) {
      this.loading = false

      this.notification.formError()
      return
    }


    this.flowService.ship(this.flow, () => {
      this.notification.flowExported();
      this.dialogRef.close()
    })

  }
}
