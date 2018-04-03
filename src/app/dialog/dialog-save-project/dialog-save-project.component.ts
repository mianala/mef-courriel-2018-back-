import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {NotificationService} from '../../notification.service';
import {FroalaService} from '../../froala.service';
import {MatDialogRef} from '@angular/material';
import {ProjectService} from '../../projects/project.service';
import {FlowService} from "../../flow.service";


@Component({
  selector: 'app-dialog-save-project',
  templateUrl: './dialog-save-project.component.html',
  styleUrls: ['./dialog-save-project.component.scss']
})
export class DialogSaveProjectComponent implements OnInit {
  project: any
  exported: any
  imported: any
  be: any
  files: any
  options: any
  user: any

  constructor(private froalaService: FroalaService,
              private dialogRef: MatDialogRef<DialogSaveProjectComponent>,
              private userService: UserService,
              private flowService: FlowService,
              private notification: NotificationService,
              private projectService: ProjectService) {
    this.imported = {}
    this.project = {
      n_arrive: 'N° 055-2016/PM/SP',
      sender: 'PM Chef du Gouv',
      ref: 'N° 055-2016/PM/SP',
      type: 1,
      lettre: 1,
      observations: 'Autre observations',
      content: '- Présentat° du rapport de la miss° d\'évaluat° des besoins électoraux',
      date: new Date(),
      received_date: new Date(),
    }

    this.files = []
    this.user = this.userService.user.getValue();
    this.options = froalaService.getOptions()
  }

  ngOnInit() {

  }

  isProject() {
    if (!this.project.n_arrive) {
      return false
    }

    return true
  }

  submit_project() {

  }

  import_flow() {
    this.flowService.importFlow(this.project)
  }

  isImported() {
    if (!this.project.status_id) {
      return false
    }

    return true
  }

  getFiles(files) {
    this.files = this.files.concat(files)
  }

  submit() {
    this.project.user = this.user
    this.project.entity_id = this.user.entity_id
    this.project.files = this.files
    this.projectService.save(this.project)
    this.dialogRef.close()
  }

}
