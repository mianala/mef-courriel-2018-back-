import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DispatchComponent } from 'app/projects/dialog/dispatch/dispatch.component';
import { NotificationService } from 'app/service/notification.service';
import { GlobalService } from 'app/service/global.service';
import { FlowService } from 'app/service/flow.service';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.scss']
})
export class SuiviComponent implements OnInit {
  observations = GlobalService.observations;
  flow: any
  constructor(
    public notification: NotificationService, private flowService: FlowService,
    private dialogRef: MatDialogRef<SuiviComponent>,
    @Inject(MAT_DIALOG_DATA) public project: any) {

    this.flow = {
      project_id: project.id,
      type_id: 0,
      sender: '',
      content: '',
      files: [],
      checkedObservations: [],
      receivers: []
    };
  }

  getFiles(files) {
    this.flow.files = this.flow.files.concat(files)
  }

  ngOnInit() { }

  toggleObservation(observation) {
    GlobalService.toggleInArray(this.flow.checkedObservations, observation)
  }

  valid() {
    return this.flow.type_id == 3 || (this.flow.sender.length)
  }
  submit() {
    this.flowService.addSuivi(this.flow, () => {
      this.notification.suiviSaved()
    })
  }
}
