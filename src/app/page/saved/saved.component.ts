import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../service/project.service";
import {FilterService} from "../../service/filter.service";
import {fadeInAnimation} from '../../animation/fadeIn'

@Component({
  selector: 'app-saved',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {
  projects;

  constructor(
    public filter: FilterService,
    private projectService: ProjectService) {
    this.projects = [];

    this.filter.query.subscribe(query => {
      this.projectService.projects.subscribe(uprojects => {
        this.projects = FilterService.filterProject(uprojects,query)

      })
    })
  }

  ngOnInit() {
  }

}
