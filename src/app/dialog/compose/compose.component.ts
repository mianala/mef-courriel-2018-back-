import {Component, OnInit} from '@angular/core'
import {UserService} from '../../service/user.service'
import {FlowService} from '../../service/flow.service'
import {FroalaService} from '../../service/froala.service'
import {EntityService} from "../../service/entity.service";
import {ProjectService} from "../../service/project.service";
import {MatDialogRef} from "@angular/material";
import {DispatchComponent} from "../../projects/dialog/dispatch/dispatch.component";
import {GlobalService} from "../../service/global.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {
  composition: any;

  options: any;
  user: any;

  upEntity;
  relativeEntities;
  downEntities;

  observations;
  checkedObservations;

  constructor(public flowService: FlowService,
              public entityService: EntityService,
              public projectService: ProjectService,
              public froala: FroalaService,
              private notification: NotificationService,
              public userService: UserService,
              private dialogRef: MatDialogRef<DispatchComponent>) {
    this.observations = GlobalService.observations;
    this.composition = {
      title: '',
      n_arrive: this.entityService.entity.getValue()['numero'],
      lettre: 1,
      content: '',
      files: [],
      receivers: []
    };

    this.composition.files = [];
    this.options = this.froala.getOptions();

  }

  updateDirection() {
    this.composition.receivers = []
  }

  checkEntity(id) {
    ComposeComponent.toggleInArray(this.composition.receivers, id);
    console.log(this.composition.receivers)
  }

  toggleObservation(observation) {
    ComposeComponent.toggleInArray(this.checkedObservations, observation);
    console.log(this.checkedObservations)
  }

  forSubmit() {
    return this.composition.direction == 1
  }

  canSubmit() {
    return this.upEntity ? this.upEntity.label : false
  }

  canShare() {
    return this.relativeEntities.length
  }

  forShare() {
    return this.composition.direction == 2
  }

  forDispatch() {
    return this.composition.direction == 3
  }

  // util
  static toggleInArray(array, value) {
    const index = array.indexOf(value);

    if (index === -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }
  }

  ngOnInit() {
    this.user = this.userService.user.getValue()

    this.relativeEntities = this.entityService.relativeEntities.getValue()
    this.downEntities = this.entityService.downEntities.getValue()
    this.upEntity = this.entityService.upEntity.getValue()
  }

  validTitle() {
    return this.composition.title.length > 3
  }

  validContent() {
    return this.composition.content.length > 3
  }

  validReceiver() {
    return this.composition.receivers.length > 0
  }

  submit() {

    if (this.forSubmit()) {
      this.composition.receivers.push(this.upEntity.id)
    }

    if (!this.validTitle()) {
      this.notification.formError()
      return
    }
    if (!this.validReceiver()) {
      this.notification.invalidReceiver()
      return
    }

    this.projectService.compose(this.composition, () => {
      this.notification.sent()
      this.dialogRef.close()
    })
  }

  getFiles(files) {
    this.composition.files = this.composition.files.concat(files)
  }

}
