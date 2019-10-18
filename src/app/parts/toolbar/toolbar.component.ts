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
import { EntityService } from 'app/service/entity.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit {
  entities = []

  statuses = []
  months = []
  weeks = []

  filtered = false
  filter: any
  query = '';
  connected: boolean;
  action_buttons;


  constructor(public userService: UserService,
    private router: Router,
    public projectService: ProjectService,
    private filterService: FilterService,
    public flowService: FlowService,
    private media: MediaObserver, private entityService: EntityService,
    private global: GlobalService,
    public dialog: MatDialog) {
    this.statuses = GlobalService.statuses;
    this.months = GlobalService.months;
    this.weeks = GlobalService.weeks;
    this.media.media$.subscribe((media: MediaChange) => {
      const status = !(media.mqAlias == 'sm' || media.mqAlias == 'xs')
      this.global.sidenav_status.next(status)
      this.action_buttons = !status
    });

    this.entityService.entities.subscribe(entities => {
      this.entities = entities
    })

    this.filterService.filters.subscribe(fs => {
      this.filter = fs
    })

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

  updateFilter() {
    this.filterService.filters.next(this.filter)
  }


  searchFocus() {
    if (this.query.length > 0) {
      this.router.navigateByUrl('/recherche')
    }
  }

  style() {
    // const colored = '"linear-gradient(to bottom, #03a9f4, rgba(255, 88, 93, 0.7))"'
    const colored = '#03a9f4'
    const uncolored = '#fafafa'

    return {
      bg: this.action_buttons ? colored : uncolored,
      color: this.action_buttons ? '#fafafa' : ''
    }
  }

  // todo: what does this mean? document bro!
  showFab() {
    return this.action_buttons
  }


  composeProject() {
    const dialogWriteEmail = this.dialog.open(ComposeComponent);
    dialogWriteEmail.afterClosed().subscribe(result => {
    })
  }

  saveProject() {
    const dialogSaveProject = this.dialog.open(DialogSaveProjectComponent);
    dialogSaveProject.afterClosed().subscribe(result => {
    })
  }

  toggleSidenav() {
    this.global.sidenav_status.next(this.global.sidenav_status.getValue() ? false : true)
  }

  toggleFilter() {
    this.filter = this.filter ? false : true
  }

}
