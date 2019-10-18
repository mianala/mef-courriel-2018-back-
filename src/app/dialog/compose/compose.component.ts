import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { UserService } from '../../service/user.service'
import { FlowService } from '../../service/flow.service'
import { EntityService } from "../../service/entity.service";
import { ProjectService } from "../../service/project.service";
import { MatDialogRef } from "@angular/material";
import { DispatchComponent } from "../../projects/dialog/dispatch/dispatch.component";
import { GlobalService } from "../../service/global.service";
import { NotificationService } from "../../service/notification.service";

@Component({
  selector: 'compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {
  composition: any;
  loading = false;

  options: any;

  user: any;

  observations = GlobalService.observations;
  checkedObservations;
  active_index = 0;

  constructor(public flowService: FlowService,
    public entityService: EntityService,
    public projectService: ProjectService,
    private notification: NotificationService,
    public userService: UserService,
    private dialogRef: MatDialogRef<DispatchComponent>) {
    this.checkedObservations = [];

    this.composition = {
      ref: '',
      title: '',
      content: '',
      receiver: '',
      files: [],
      be: {},
      hasBe: 0,
      receivers: []
    };
    this.composition.files = [];

    this.projectService.project.subscribe(project => {
      this.composition.project = project
    })

  }

  // how about direction? there will be no direction animore in the database we have to calculate it in the front end, this is much better

  ngOnInit() {
    this.user = this.userService.user.getValue();
  }

  validTitle() {
    return this.composition.title.length > 3
  }

  updateReceiver(receivers) {
    console.log(receivers)
    this.composition.receiver = receivers.receiver
    this.composition.receivers = receivers.receivers
  }

  updateBe(be) {
    this.composition.be = be
  }

  validReceiver() {
    return this.composition.receivers.length || this.composition.receiver.length > 2
  }

  submit() {

    this.loading = true;

    let obs = '';

    for (let o of this.checkedObservations) {
      obs += ' - ' + o + '<br>'
    }

    if (!this.validTitle()) {
      this.notification.formError();
      this.loading = false;
      return
    }
    if (!this.validReceiver()) {
      this.notification.invalidReceiver();
      this.loading = false;
      return
    }

    // update button to loading button
    this.composition.content = obs.concat(this.composition.content);

    this.projectService.compose(this.composition, () => {
      // notification
      this.dialogRef.close()
    })
  }

  valid() {
    const v: boolean = this.validReceiver() && this.validTitle()
    if (this.composition.hasBe) {
      return v && this.composition.be.valid
    } else {
      return v
    }
  }

  getFiles(files) {
    this.composition.files = this.composition.files.concat(files)
  }

  indexChanged(event) {
    this.active_index = event.index
  }
}
