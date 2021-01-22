import { Component, Input, OnInit } from '@angular/core';
import { DispatchComponent } from "../dialog/dispatch/dispatch.component";
import { MatDialog } from "@angular/material/dialog";
import { EntityService } from "../../service/entity.service";
import { GlobalService } from "../../service/global.service";
import { ProjectService } from '../../service/project.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() project;
  in_types;
  letter_types;
  sender = '';
  statuses = []

  constructor(public dialog: MatDialog, public entityService: EntityService, private projectService: ProjectService) {
    this.letter_types = GlobalService.letter_types;
    this.in_types = GlobalService.in_types

    this.statuses = GlobalService.statuses
  }

  ngOnInit() {

    if (this.composed()) {
      this.sender = 'Rédigé par'
    } else {
      this.sender = 'Expéditeur'
    }
  }

  composed() {
    return this.project.composed == 1
  }

  dispatch() {
    this.dialog.open(DispatchComponent);
  }

}
