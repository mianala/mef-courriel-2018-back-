import {Component, EventEmitter, OnInit, Output} from '@angular/core'
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
  loading = false;

  options: any;

  user: any;

  upEntity;
  relativeEntities;
  downEntities;

  observations = GlobalService.observations;
  checkedObservations;



  constructor(public flowService: FlowService,
              public entityService: EntityService,
              public projectService: ProjectService,
              public froala: FroalaService,
              private notification: NotificationService,
              public userService: UserService,
              private dialogRef: MatDialogRef<DispatchComponent>) {
    this.checkedObservations = [];
    this.composition = {
      title: 'some title',
      n_arrive: this.entityService.entity.getValue()['numero'],
      lettre: 1,
      content: 'some content',
      files: [],
      be : {},
      hasBe : 0,
      receivers: []
    };
    this.composition.files = [];
    this.options = this.froala.getOptions();
  }

  updateDirection(p) {
    this.composition.receivers = [];

    if (p.value == 1) {
      this.composition.receivers.push(this.upEntity.id)
    }
  }

  checkEntity(id) {
    GlobalService.toggleInArray(this.composition.receivers, id);
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

  ngOnInit() {
    this.user = this.userService.user.getValue();

    this.relativeEntities = this.entityService.relativeEntities.getValue();
    this.downEntities = this.entityService.downEntities.getValue();
    this.upEntity = this.entityService.upEntity.getValue()
  }

  validTitle() {
    return this.composition.title.length > 3
  }

  updateBe(be){
    this.composition.be = be
  }

  validReceiver() {
    return this.composition.receivers.length > 0
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

    console.log(this.composition)

    // update button to loading button
    this.composition.content = obs.concat(this.composition.content);

    this.projectService.compose(this.composition, () => {
      this.notification.sent();
      this.dialogRef.close()
    })
  }

  valid(){
    const v: boolean = this.validReceiver() && this.validTitle()
    if (this.composition.hasBe) {
      return v && this.composition.be.valid
    }else{
      return v
    }
  }

  getFiles(files) {
    this.composition.files = this.composition.files.concat(files)
  }

}
