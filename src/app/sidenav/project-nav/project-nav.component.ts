import { Component, OnInit } from '@angular/core';
import { EntityService } from "../../service/entity.service";
import { FlowService } from "../../service/flow.service";
import { ProjectService } from "../../service/project.service";
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material';
import { ComposeComponent } from 'app/dialog/compose/compose.component';
import { DialogSaveProjectComponent } from 'app/dialog/save-import/dialog-save-project.component';

@Component({
  selector: 'app-project-nav',
  templateUrl: './project-nav.component.html',
  styleUrls: ['./project-nav.component.scss']
})
export class ProjectNavComponent implements OnInit {
  label

  constructor(private entityService: EntityService,
    public flowService: FlowService,
    public projectService: ProjectService,
    public dialog: MatDialog) {

    this.entityService.entity.subscribe(entity => {
      if (!entity) { return }
      if (entity['label']) {
        this.label = entity['label']
      }
    })

  }

  ngOnInit() {
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
}
