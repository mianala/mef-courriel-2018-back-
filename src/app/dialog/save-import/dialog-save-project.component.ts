import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {NotificationService} from '../../service/notification.service';
import {FroalaService} from '../../service/froala.service';
import {MatDialogRef} from '@angular/material';
import {ProjectService} from '../../service/project.service';
import {FlowService} from '../../service/flow.service';
import {GlobalService} from '../../service/global.service';


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
  shipped_projects;
  letter_types;
  in_types;
  return_types = GlobalService.return_types;
  form_max_date: Date;
  active_index = 0;

  constructor(private froalaService: FroalaService,
              private dialogRef: MatDialogRef<DialogSaveProjectComponent>,
              private userService: UserService,
              private flowService: FlowService,
              private notification: NotificationService,
              private projectService: ProjectService) {
    this.flow = {
      numero: '',
      project_id: 0,
      status_id: 0,
      sender: '', // autocomplete this
      content: '',
    };

    this.letter_types = GlobalService.letter_types;
    this.in_types = GlobalService.in_types;


    this.form_max_date = new Date();

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
    };

    this.shipped_projects = [];

    this.projectService.shipped_projects.subscribe(projects => {
      console.log(projects)
      this.shipped_projects = projects
    });

    this.projectService.project.subscribe((project) => {
      this.flow.project_id = project.id
    });

    this.files = [];
    this.user = this.userService.user.getValue();
    this.options = froalaService.getOptions()
  }

  ngOnInit() {

  }

  validProject() {
    return !(this.project.n_arrive.length > 0 || this.project.sender.length < 3 || this.project.content.length < 3);
  }

  validFlow() {
    return !(this.flow.sender.length < 3 || this.flow.numero.length < 1 || this.flow.content.length < 3);
  }

  saving() {
    return !this.active_index
  }

  getFiles(files) {
    this.files = this.files.concat(files)
  }

  indexChanged(event) {
    this.active_index = event.index
  }

  submit() {

    this.loading = true;

    this.project.user = this.user;
    this.project.entity_id = this.user.entity_id;
    this.project.files = this.files;

    // change to loading button
    this.projectService.save(this.project, () => {
      this.notification.projectSaved();
      this.dialogRef.close()
    })
  }

  _import() {
    this.loading = true;
    this.flow.files = this.files;
    this.flowService._import(this.flow, () => {
      this.notification.flowImported();
      this.dialogRef.close()
    })

  }

}
