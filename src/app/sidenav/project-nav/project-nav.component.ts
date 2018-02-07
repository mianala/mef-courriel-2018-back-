import {Component, OnInit} from '@angular/core';
import {EntityService} from "../../entity.service";

@Component({
  selector: 'app-project-nav',
  templateUrl: './project-nav.component.html',
  styleUrls: ['./project-nav.component.scss']
})
export class ProjectNavComponent implements OnInit {
  label

  constructor(private entityService: EntityService) {
    this.entityService.entity.subscribe(entity => {
      this.label = entity['label']
    })
  }

  ngOnInit() {
  }

}
