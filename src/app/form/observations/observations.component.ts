import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})
export class ObservationsComponent implements OnInit {
  author
  content
  observations
  @Output() obs
  @Input() i
  options

  constructor() {
  }

  ngOnInit() {
    this.observations = []
  }


  emit() {
    this.obs.emit(this.observations)
  }

}
