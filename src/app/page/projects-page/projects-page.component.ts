import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'app/service/project.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {
  projects
  constructor(private projectServices: ProjectService) {
    this.projectServices.latestProjects.subscribe(s => {
      this.projects = s
    })
  }

  ngOnInit() {
  }

}
