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
  }

  ngOnInit() {
    this.filter.query.next('')
  }
  senderLabel(project) {
    if (!project) {
      return
    }
    if (project.sender) {
      return project.sender.slice(0, 25) + (project.sender.length > 25 ? '...' : '')
    } else {
      return ''
    }
  }

  sameday(project) {
    return GlobalService.sameDay(new Date(project.date), new Date())
  }

  treated(project) {
    return project.status_id != 1
  }

  setProject(project) {
    this.projectService.setProject(project);
    this.router.navigateByUrl('/courriels/courriel')
  }

  editable() {
    return true
  }

  viewable(project) {
    return project.status_id != 0
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
