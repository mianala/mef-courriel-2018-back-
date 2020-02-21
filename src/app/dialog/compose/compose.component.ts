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
  project: any;
  loading = false;

  options: any;

  user: any;

  observations = GlobalService.observations;
  checkedObservations;
  active_index = 0;

  letter_types;
  in_types;
  constructor(public flowService: FlowService,
    public entityService: EntityService,
    public projectService: ProjectService,
    private notification: NotificationService,
    public userService: UserService,
    private dialogRef: MatDialogRef<DispatchComponent>) {
      this.letter_types = GlobalService.letter_types;
      this.in_types = GlobalService.in_types;
       this.checkedObservations = [];

    this.project = {
      numero: '',
      sender: '',
      ref: '',
      type_id: 0,
      letter_id: 0,
      title: '',
      content: '',
      description: '',
      courriel_date: new Date(),
      received_date: new Date(),
      receiver: '',
      receivers: []
    };
    this.project.files = [];

    // what is this?
    // this.projectService.project.subscribe(project => {
    //   this.project.project = project
    // })

  }

  // how about direction? there will be no direction animore in the database we have to calculate it in the front end, this is much better

  ngOnInit() {
    this.user = this.userService.user.getValue();
  }

  validTitle() {
    return this.project.title.length > 3
  }

  updateReceiver(receivers) {
    this.project.receiver = receivers.receiver
    this.project.receivers = receivers.receivers
  }

  // updateBe(be) {
  //   this.project.be = be
  // }

  validReceiver() {
    return this.project.receivers.length || this.project.receiver.length > 2
  }

  submit() {

    this.loading = true;

    let obs = '';

    for (let o of this.checkedObservations) {
      obs += ' - ' + o + '<br>'
    }

    // update button to loading button
    this.project.content = obs.concat(this.project.content);

    this.projectService.compose(this.project, () => {
      // notification
      this.dialogRef.close()
    })
  }

  updateForm(project) {
    this.project.numero = project.numero
    this.project.courriel_date = project.courriel_date
    this.project.received_date = project.received_date
    this.project.letter_id = project.letter_id
    this.project.ref = project.ref
    this.project.title = project.title
    this.project.content = project.content
    this.project.description = project.description
    this.project.observation = project.observation
  }
  valid() {
    return  this.validReceiver() 
  }

  getFiles(files) {
    this.project.files = this.project.files.concat(files)
  }

  indexChanged(event) {
    this.active_index = event.index
  }
}
