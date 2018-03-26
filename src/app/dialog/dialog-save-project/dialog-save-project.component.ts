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
  options: any
  user: any

  constructor(private froalaService: FroalaService,
              private dialogRef: MatDialogRef<DialogSaveProjectComponent>,
              private userService: UserService,
              private flowService: FlowService,
              private notification: NotificationService,
              private projectService: ProjectService) {
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

    this.project.files = []
    this.user = this.userService.user.getValue();
    this.options = froalaService.getOptions()
  }

  ngOnInit() {

  }

  new_project() {
    if (!this.project.n_arrive) {
      return false
    }

    return true
  }

  submit_project(){

  }

  import_flow(){
    this.flowService.importFlow(this.project)
  }

  imported() {
    if (!this.project.status_id) {
      return false
    }

    return true
  }

  getFiles(files) {
    this.project.files = this.project.files.concat(files)
  }

  submit() {

    if (!this.new_project()) {
      this.notification.formError()
    } else {
      this.project.user = this.user
      this.project.entity_id = this.user.entity_id
      this.projectService.save(this.project)
      this.dialogRef.close()
    }
  }

}
