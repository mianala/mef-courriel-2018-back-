import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { NotificationService } from '../../service/notification.service';
import { MatDialogRef } from '@angular/material';
import { ProjectService } from '../../service/project.service';
import { FlowService } from '../../service/flow.service';
import { GlobalService } from '../../service/global.service';
import { EntityService } from '../../service/entity.service';


@Component({
  selector: 'app-dialog-save-project',
  templateUrl: './dialog-save-project.component.html',
  styleUrls: ['./dialog-save-project.component.scss']
})
export class DialogSaveProjectComponent implements OnInit {
  project: any;
  flow: any;
  loading = false;
  be: any;
  files: any;
  options: any;
  user: any;
  letter_types;
  in_types;
  form_max_date: Date;
  last_n_project

  constructor(
    private dialogRef: MatDialogRef<DialogSaveProjectComponent>,
    private userService: UserService,
    private flowService: FlowService,
    private notification: NotificationService,
    private projectService: ProjectService, private entityService: EntityService) {

    this.letter_types = GlobalService.letter_types;
    this.in_types = GlobalService.in_types;


    this.form_max_date = new Date();

    this.project = {
      numero: '',
      sender: 'MINISTRE',
      ref: 'MIN',
      type_id: 0,
      letter_id: 0,
      title: 'TITLE',
      content: 'OBSERVATIONS',
      description: 'DESCRIPTION',
      courriel_date: new Date(),
      received_date: new Date(),
    };

    let entity = this.entityService.entity.getValue()

    this.entityService.last_n_project.subscribe(id => {
      this.last_n_project = entity['label'] + '-' + new Date().getFullYear() + '/' + (id + 1)
    })


    this.files = [];
    this.user = this.userService.user.getValue();
  }

  ngOnInit() {

  }

  validProject() {
    return !(this.project.sender.length < 2 || this.project.content.length < 3);
  }

  getFiles(files) {
    this.files = this.files.concat(files)
  }


  submit() {
    const reload = this.reload
    this.loading = true;

    this.project.user = this.user;
    this.project.entity_id = this.user.entity_id;
    this.project.files = this.files;

    this.projectService.save({
      project: this.project, next: (id) => {
        if (id > 0) {
          this.notification.projectSaved();
          this.dialogRef.close();
        }
        else {
          this.notification.requestError();
          reload();
          // change to loading to false
        }
      }
      })
  }

  reload() {
    this.loading = false
  }


}
