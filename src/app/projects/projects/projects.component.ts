import {Component, Input, OnInit} from '@angular/core';
import {FlowService} from "../../service/flow.service";
import {EntityService} from "../../service/entity.service";
import {MatDialog} from "@angular/material";
import {ProjectService} from "../../service/project.service";
import {DispatchComponent} from "../dialog/dispatch/dispatch.component";
import {DialogWriteEmailComponent} from "../../dialog/write/write.component";
import {Router} from "@angular/router";

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @Input() projects

  constructor(
    public router:Router,
    public flowService: FlowService,
    public entityService: EntityService,
    public dialog: MatDialog,
    private projectService: ProjectService) {

  }

  ngOnInit() {
  }

  setProject(id) {
    this.projectService.setProject(id)
    this.router.navigateByUrl('/courriels/courriel')
  }

  submitable(){
    return false
  }

  writeEmail() {
    const dialogWriteEmail = this.dialog.open(DialogWriteEmailComponent);
    dialogWriteEmail.afterClosed().subscribe(result => {
    })
  }
  dispatch(id) {
    this.projectService.setProject(id)
    this.dialog.open(DispatchComponent);
  }
}
