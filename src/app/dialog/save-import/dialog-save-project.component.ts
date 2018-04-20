import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {NotificationService} from '../../service/notification.service';
import {FroalaService} from '../../service/froala.service';
import {MatDialogRef} from '@angular/material';
import {ProjectService} from '../../service/project.service';
import {FlowService} from "../../service/flow.service";
import {GlobalService} from "../../service/global.service";


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
  shipped_flows
  letter_types
  in_types
  form_max_date: Date

  constructor(private froalaService: FroalaService,
              private dialogRef: MatDialogRef<DialogSaveProjectComponent>,
              private userService: UserService,
              private flowService: FlowService,
              private notification: NotificationService,
              private projectService: ProjectService) {
    this.imported = {
      ref: '',
      numero: '',
    }

    this.letter_types = GlobalService.letter_types
    this.in_types = GlobalService.in_types


    this.form_max_date = new Date()

    this.project = {
      n_arrive: '',
      sender: '',
      ref: '',
      type: 0,
      lettre: 0,
      observations: '',
      content: '',
      date: new Date(),
      received_date: new Date(),
    }

    this.shipped_flows = []

    this.flowService.shipped_flows.subscribe(flows => {
      this.shipped_flows = flows
    })

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

  valid() {
    return !(this.project.n_arrive.length < 3 || this.project.sender.length < 3 || this.project.content.length < 3);
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

    if (this.valid()) {
      this.project.user = this.user
      this.project.entity_id = this.user.entity_id
      this.project.files = this.files
      this.projectService.save(this.project)
      this.dialogRef.close()
    }else{
      this.notification.formError()
    }
  }

}
