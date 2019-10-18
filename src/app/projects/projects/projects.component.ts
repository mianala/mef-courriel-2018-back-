import { Component, Input, OnInit } from '@angular/core';
import { EntityService } from '../../service/entity.service';
import { MatDialog, PageEvent } from '@angular/material';
import { ProjectService } from '../../service/project.service';
import { DispatchComponent } from '../dialog/dispatch/dispatch.component';
import { Router } from '@angular/router';
import { GlobalService } from '../../service/global.service';
import { FilterService } from '../../service/filter.service';
import { EditProjectComponent } from '../../dialog/edit-project/edit-project.component';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @Input() projects;
  shownProjects;
  treating;
  sort = 'date'
  // MatPaginator Inputs
  length = 0;

  statuses = []

  paginator = GlobalService.paginator;
  paginate = GlobalService.paginate;
  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent();

  constructor(private notification: NotificationService, public router: Router,
    public entityService: EntityService,
    public filter: FilterService,
    public dialog: MatDialog,
    private projectService: ProjectService) {
    this.pageEvent.pageIndex = 0
    this.pageEvent.pageSize = this.paginator.pageSize

    this.statuses = GlobalService.statuses
  }

  ngOnInit() {
  }

  senderLabel(project) {

    if (project.sender) {
      return project.sender.slice(0, 25) + (project.sender.length > 25 ? '...' : '')
    } else {
      return ''
    }
  }

  getFiles(project, id, pageEvent) {
    console.log(project)
    id += pageEvent.pageIndex * pageEvent.pageSize
    console.log(id)
    this.projectService.getProjectFiles(project.id, (files) => {
      this.projects[id].files = files
    })
  }

  sameday(project) {
    return GlobalService.sameDay(new Date(project.date), new Date())
  }

  treated(project) {
    return project.status_id != 1
  }

  updateStatus(project, event) {
    // if success then just change the status if not return error in notification and cancels the change
    this.projectService.updateStatus(project, event.value, (result) => {
      console.log(result);
    })
  }

  setProject(project) {
    this.projectService.setProject(project);
    this.router.navigateByUrl('/projet')
  }

  editable() {
    return true
  }


  delete(project) {
    if (confirm('Suprimer le projet ' + project.entity_label + '/' + project.n_project + ' ?')) {
      this.projectService.deleteProject(project, () => {
        this.notification.projectDeleted();
      });
    }
  }

  treat(project) {
    this.treating = project.id;
    this.projectService.treat(project, () => {
      this.treating = 0
    })
  }

  edit(project) {
    this.projectService.setProject(project);
    this.dialog.open(EditProjectComponent)
  }
  dispatch(project) {
    this.projectService.project.next(project);
    this.dialog.open(DispatchComponent);
  }
}
