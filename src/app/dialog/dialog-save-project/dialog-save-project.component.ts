import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {NotificationService} from '../../notification.service';
import {FroalaService} from '../../froala.service';
import {MatDialogRef} from '@angular/material';
import {ProjectService} from '../../projects/project.service';


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
              private notification: NotificationService,
              private projectService: ProjectService) {
    this.project = {
      n_arrive: 'N° 055-2016/PM/SP',
      n_arrive_dg: '3600',
      sender: 'PM Chef du Gouv',
      ref: 'N° 055-2016/PM/SP',
      type: 1,
      lettre: 1,
      observations: 'Some observations',
      content: '- Présentat° du rapport de la miss° d\'évaluat° des besoins électoraux',
      date: new Date(),
      entity_id: 32,
      received_date: new Date(),
    }

    this.project.files = []
    this.user = this.userService.user.getValue();
    this.options = froalaService.getOptions()
  }

  ngOnInit() {

  }

  valid() {
    console.log(this.project.n_arrive)
    if (!this.project.n_arrive || !this.project.n_arrive_dg) {
      return false
    }

    return true
  }

  getFiles(files) {
    this.project.files = this.project.files.concat(files)
  }

  submit() {
    if (!this.valid()) {
      this.notification.formError()
    } else {
      this.project.user = this.user
      this.projectService.save(this.project)
      this.dialogRef.close()
    }
  }

}
