import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})
export class ObservationsComponent implements OnInit {
  author
  content
  observations = []
  @Output() obs
  @Input() i

  constructor() {
  }

  ngOnInit() {
    this.observations = this.i
  }

  newObservationAdded() {
    this.observations.push({
      author: this.author,
      content: this.content
    })

    this.content = ''
    this.author = ''

    this.emit()
  }

  emit() {
    this.obs.emit(this.observations)
  }

}
