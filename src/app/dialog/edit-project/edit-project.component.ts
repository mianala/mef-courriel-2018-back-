import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../service/project.service';
import {NotificationService} from '../../service/notification.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  project
  loading = false

  constructor(private projectService: ProjectService, private notification:NotificationService) {

    this.project = this.projectService.project.getValue()
    this.project.files = []

  }

  ngOnInit() {
    console.log(this.project)
  }

  updateProject(project) {
    this.project = project
  }

  validProject() {
    return !(this.project.n_arrive.length < 1 || this.project.sender.length < 2 || this.project.title.length < 3);
  }

  submit() {
    this.projectService.update(this.project, () => {
      this.notification.projectEdited()
    })
  }



  getFiles(files) {
    this.project.files = this.project.files.concat(files)
  }
}
