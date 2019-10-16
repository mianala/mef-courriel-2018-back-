import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../service/project.service";
import { FilterService } from "../../service/filter.service";
import { fadeInAnimation } from '../../animation/fadeIn'

@Component({
  selector: 'app-treated-project',
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
  templateUrl: './treated-project.component.html',
  styleUrls: ['./treated-project.component.scss']
})
export class TreatedProjectComponent implements OnInit {
  projects;

  constructor(public filter: FilterService,
    private projectService: ProjectService) {

    this.projects = [];

  }

  ngOnInit() {
  }
}
