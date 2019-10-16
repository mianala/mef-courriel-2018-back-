import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectService} from "../../service/project.service";
import {FilterService} from "../../service/filter.service";
import {fadeInAnimation} from '../../animation/fadeIn'

@Component({
  selector: 'app-dispatched-page',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './dispatched-page.component.html',
  styleUrls: ['./dispatched-page.component.scss']
})
export class DispatchedPageComponent implements OnInit {
  projects;

  constructor(
    public router: Router, public filter: FilterService,
    private projectService: ProjectService) {
    this.projects = [];

  }

  ngOnInit() {
  }

}
