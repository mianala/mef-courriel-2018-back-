import {Component, Input, OnInit} from '@angular/core';
import {EntityService} from '../../service/entity.service';
import {MatDialog, PageEvent} from '@angular/material';
import {ProjectService} from '../../service/project.service';
import {DispatchComponent} from '../dialog/dispatch/dispatch.component';
import {Router} from '@angular/router';
import {GlobalService} from '../../service/global.service';
import {FilterService} from '../../service/filter.service';
import {ExportComponent} from '../../dialog/export/export.component';
import {EditProjectComponent} from '../../dialog/edit-project/edit-project.component';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @Input() projects;
  shownProjects;
  treating

  // MatPaginator Inputs
  length = 0;

  paginator = GlobalService.paginator
  paginate = GlobalService.paginate
  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent();


  constructor(public router: Router,
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

  sameday(project) {
    return GlobalService.sameDay(new Date(project.date), new Date())
  }

  treated(project) {
    return FilterService.treatedProject(project)
  }

  setProject(project) {
    this.projectService.setProject(project);
    this.router.navigateByUrl('/courriels/courriel')
  }

  submitable() {
    return false
  }

  editable() {
    return true
  }

  viewable(project) {
    return project.dispatched == 1
  }

  submit() {

  }

  treatable(project) {

    return project.status_id != 1
  }

  treat(project) {
    this.treating = project.id
    this.projectService.treat(project, () => {
      this.treating = 0
    })
  }

  edit(project) {
    this.projectService.setProject(project);
    this.dialog.open(EditProjectComponent)
  }


  ship(project) {
    this.projectService.setProject(project);
    this.dialog.open(ExportComponent);
  }

  dispatch(project) {
    this.projectService.project.next(project);
    this.dialog.open(DispatchComponent);
  }
}
