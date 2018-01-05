import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {NotificationService} from '../../notification.service';
import {FroalaService} from '../../froala.service';
import {MatDialogRef} from '@angular/material';
import {ProjectService} from '../../projects/project.service';


@Component({
  selector: 'app-dialog-save-mail',
  templateUrl: './dialog-save-mail.component.html',
  styleUrls: ['./dialog-save-mail.component.scss']
})
export class DialogSaveMailComponent implements OnInit {
  saved: any
  options: any
  user: any

  constructor(private froalaService: FroalaService,
              private dialogRef: MatDialogRef<DialogSaveMailComponent>,
              private userService: UserService,
              private notification: NotificationService,
              private projectService: ProjectService) {
    this.saved = {
      n_arrive: 'N° 055-2016/PM/SP',
      n_arrive_dg: '3600',
      sender: 'PM Chef du Gouv',
      ref: 'N° 055-2016/PM/SP',
      type: 1,
      lettre: 1,
      observations: '',
      content: '- Présentat° du rapport de la miss° d\'évaluat° des besoins électoraux',
      date: new Date(),
      received_date: new Date(),
    }

    this.saved.files = []
    this.user = this.userService.user.getValue();
    this.options = froalaService.getOptions()
  }

  ngOnInit() {

  }

  valid() {
    console.log(this.saved.n_arrive)
    if (!this.saved.n_arrive || !this.saved.n_arrive_dg) {
      return false
    }

    return true
  }

  getFiles(files) {
    this.saved.files = this.saved.files.concat(files)
  }

  submit() {
    if (!this.valid()) {
      this.notification.formError()
    } else {
      this.saved.user = this.user
      this.projectService.save(this.saved)
      // this.dialogRef.close()
    }
  }

}
