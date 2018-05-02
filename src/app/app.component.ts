import {Component, OnInit} from '@angular/core';
import {UserService} from './service/user.service';
import {Router} from '@angular/router';
import {SocketService} from "./service/socket.service";
import {ProjectService} from "./service/project.service";
import {FlowService} from "./service/flow.service";
import {DialogSaveProjectComponent} from "./dialog/save-import/dialog-save-project.component";
import {ReportComponent} from "./dialog/report/report.component";
import {MatDialog} from "@angular/material";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {ComposeComponent} from "./dialog/compose/compose.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app'
  connected: boolean
  sidenav_status
  sidenav_mode

  constructor(public userService: UserService,
              public router: Router,
              public projectService: ProjectService,
              public flowService: FlowService,
              private media: ObservableMedia,
              public dialog: MatDialog,
              public socketService: SocketService) {


    this.media.subscribe((media: MediaChange) => {
        this.sidenav_status = !(media.mqAlias == 'sm' || media.mqAlias == 'xs')
      }
    )

    this.sidenav_status = true
    this.sidenav_mode = 'side'
  }

  ngOnInit() {

    // todo wait for a little before redirecting

    // todo user login
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

  report() {
    const dialogReport = this.dialog.open(ReportComponent);
  }

  toggleSidenav() {
    this.sidenav_status = this.sidenav_status != true;
  }


}
