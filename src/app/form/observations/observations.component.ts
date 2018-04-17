import {Component, Input, OnInit, Output} from '@angular/core';
import {FroalaService} from "../../service/froala.service";

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

  constructor(private froalaService: FroalaService) {
    this.options = froalaService.getOptions()
  }

  ngOnInit() {
    this.observations = []
  }


  emit() {
    this.obs.emit(this.observations)
  }

}
