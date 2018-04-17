import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectService} from "../../service/project.service";

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {
  projects
  constructor(
    public router:Router,
    private projectService: ProjectService) {

    this.projects = []
    this.projectService.projects.subscribe(projects => {
      console.log(projects)
      this.projects = projects
    })
  }

  ngOnInit() {
  }

}
