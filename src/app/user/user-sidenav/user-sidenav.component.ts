import { Component, OnInit } from '@angular/core';
import { ComposeComponent } from 'app/dialog/compose/compose.component';
import { DialogSaveProjectComponent } from 'app/dialog/save-import/dialog-save-project.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: '[app-user-sidenav]',
  templateUrl: './user-sidenav.component.html',
  styleUrls: ['./user-sidenav.component.scss']
})
export class UserSidenavComponent implements OnInit {

  constructor( public dialog: MatDialog) { }

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
