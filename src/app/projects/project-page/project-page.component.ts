import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../project.service";
import {ThreadService} from "../../thread/thread.service";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {
  project
  threads

  constructor(private projectService: ProjectService, private threadService: ThreadService) {
    this.projectService.project.subscribe(project => {
      this.project = project
    })
    this.threadService.projectThreads.subscribe(threads => {
      this.threads = threads
    })
  }

  ngOnInit() {
  }

}
