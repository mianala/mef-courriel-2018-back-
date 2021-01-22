import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { NotificationService } from '../../service/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogSaveProjectComponent } from '../save-import/dialog-save-project.component';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  project
  loading = false

  constructor(
    private dialogRef: MatDialogRef<DialogSaveProjectComponent>,
    private projectService: ProjectService, private notification: NotificationService) {

    this.project = this.projectService.project.getValue()
    this.project.newFiles = []
    this.project.updatedFiles = this.project.files

  }

  ngOnInit() {
    console.log(this.project)
  }

  updateProject(project) {
    this.project = project
    this.project.date = project.received_date
  }

  validProject() {
    return !(this.project.sender.length < 2 || this.project.title.length < 3);
  }

  submit() {
    this.loading = true
    this.projectService.update(this.project, (id) => {
      console.log(id)
      if (id > 0) {
        this.notification.projectEdited()
        this.project.files = this.project.files.concat(this.project.newFiles)
        this.dialogRef.close()
      } else {
        // todo: we have a problem here, the loading won't turn to true
        this.notification.requestError()
        this.reload()
      }
    })
  }

  removeProjectFile(file) {
    if (confirm('Suprimer le fichier ' + file.originalname + ' ?')) {

      this.projectService.removeProjectFile(file.id, (status) => {
        console.log(status)
        this.notification.checkId(status, this.notification.fileRemoved())
      })
    }
  }

  reload(){
    this.loading = false
  }

  getFiles(files) {
    this.project.newFiles = this.project.newFiles.concat(files)
  }
}
