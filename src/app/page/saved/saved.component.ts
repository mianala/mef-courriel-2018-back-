import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectService} from "../../service/project.service";
import {FilterService} from "../../service/filter.service";

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {
  projects


  constructor(
    public router: Router,
    public filter: FilterService,
    private projectService: ProjectService) {
    this.projects = []

    this.filter.query.subscribe(query => {
      this.projectService.projects.subscribe(uprojects => {
        console.log(uprojects)
        this.projects = uprojects.filter(project => {
          return project.sender.toLowerCase().includes(query.toLowerCase()) || project.content.toLowerCase().includes(query.toLowerCase())
        })
      })
    })
  }

  ngOnInit() {
  }

}
