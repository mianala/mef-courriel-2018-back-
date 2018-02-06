import {Component, OnInit} from '@angular/core'
import {UserService} from '../../user.service'
import {FlowService} from '../../flow.service'
import {FroalaService} from '../../froala.service'
import {EntityService} from "../../entity.service";
import {ProjectService} from "../../projects/project.service";
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith, map} from 'rxjs/operators';

@Component({
  selector: 'app-dialog-write-email',
  templateUrl: './dialog-write-email.component.html',
  styleUrls: ['./dialog-write-email.component.scss']
})
export class DialogWriteEmailComponent implements OnInit {
  project: any
  thread

  options: any
  user: any
  entities
  observations
  entityCtrl: FormControl
  filteredEntities: Observable<any[]>;

  constructor(private flowService: FlowService,
              private entityService: EntityService,
              private projectService: ProjectService,
              private froala: FroalaService,
              private userService: UserService) {
    this.observations = this.projectService.observations
    this.project = {
      title: '',
      n_arrive: 'N° 055-2016/PM/SP',
      sender: 'PM Chef du Gouv',
      ref: 'N° 055-2016/PM/SP',
      type: 1,
      lettre: 1,
      observations: 'Some observations',
      content: '- Présentat° du rapport de la miss° d\'évaluat° des besoins électoraux',
      date: new Date(),
      received_date: new Date(),
    }

    this.thread = {
      content: 'EN AYANT L\'HONNEUR DE VOUS TRANSMETTRE POUR NOTIFICATION',
      files: [],
      checkedObservations: [],
      receivers: []
    }

    this.project.files = []
    this.options = this.froala.getOptions()

    this.entityService.entities.subscribe(entities => {

      this.entities = entities
      //  setting up the controller
      this.entityCtrl = new FormControl()
      this.filteredEntities = this.entityCtrl.valueChanges.pipe(
        startWith(''),
        map(entity => entity ? this.filterEntities(entity['label']) : this.entities.slice())
      )

    })
  }

  checkEntity(id) {
    this.toggleInArray(this.thread.receivers, id)
    console.log(this.thread.receivers)
  }

  toggleObservation(observation) {
    this.toggleInArray(this.thread.checkedObservations, observation)
    console.log(this.thread.checkedObservations)
  }

  // util
  toggleInArray(array, value) {
    const index = array.indexOf(value);

    if (index === -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }
  }

  ngOnInit() {
    this.user = this.userService.user.getValue()
  }

  submit() {
    this.project.user = this.user
    this.project.savedId = 0
    this.flowService.start(this.project)
  }

  getFiles(files) {
    this.project.files = this.project.files.concat(files)
  }

  selectUser(user) {
    this.user = user
  }


  filterEntities(name: string) {
    return this.entities.filter(entity =>
      entity.label.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

}
