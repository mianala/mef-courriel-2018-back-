import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogSaveProjectComponent } from '../save-import/dialog-save-project.component';
import { NotificationService } from 'app/service/notification.service';
import { ProjectService } from 'app/service/project.service';
import { EntityService } from 'app/service/entity.service';

@Component({
  selector: 'app-print-dialog',
  templateUrl: './print-dialog.component.html',
  styleUrls: ['./print-dialog.component.scss']
})
export class PrintDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogSaveProjectComponent>,
    private notification: NotificationService,
    private projectService: ProjectService, private entityService: EntityService) {
      
     }

  ngOnInit() {
  }

}
