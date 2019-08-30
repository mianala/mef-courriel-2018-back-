import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { UserService } from 'app/service/user.service';
import { ProjectService } from 'app/service/project.service';
import { FlowService } from 'app/service/flow.service';
import { ComposeComponent } from 'app/dialog/compose/compose.component';
import { DialogSaveProjectComponent } from 'app/dialog/save-import/dialog-save-project.component';
import { GlobalService } from 'app/service/global.service';
import { FilterService } from 'app/service/filter.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit {
  query
  connected: boolean;
  action_buttons;
  constructor(public userService: UserService,
    private router: Router,
    public projectService: ProjectService,
    private filterService: FilterService,
    public flowService: FlowService,
    private media: MediaObserver,
    private global: GlobalService,
    public dialog: MatDialog) {

    this.media.media$.subscribe((media: MediaChange) => {
      const status = !(media.mqAlias == 'sm' || media.mqAlias == 'xs')
      this.global.sidenav_status.next(status)
      this.action_buttons = !status
    });
  }

  ngOnInit() {

  }



  updateQuery() {
    // if not in route 'rechercher'
    if (this.query.length > 0) {
      this.router.navigateByUrl('/recherche')
    }

    this.filterService.query.next(this.query)
  }


  searchFocus() {
    if (this.query.length > 0) {
      this.router.navigateByUrl('/recherche')
    }

    this.flowService.getAllFlows()
    this.projectService.getAllProjects()
  }

  style() {
    const colored = '#03a9f4'
    const uncolored = '#fafafa'

    return {
      bg: this.action_buttons ? colored : uncolored,
      color: this.action_buttons ? '#fafafa' : ''
    }
  }

  showFab() {
    return this.action_buttons
  }


  writeEmail() {
    const dialogWriteEmail = this.dialog.open(ComposeComponent);
    dialogWriteEmail.afterClosed().subscribe(result => {
    })
  }

  saveEmail() {
    const dialogSaveProject = this.dialog.open(DialogSaveProjectComponent);
    dialogSaveProject.afterClosed().subscribe(result => {
    })
  }

  toggleSidenav() {
    this.global.sidenav_status.next(this.global.sidenav_status.getValue() ? false : true)
  }

}
