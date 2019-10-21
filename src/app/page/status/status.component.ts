import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'app/service/project.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  status_id
  projects
  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.status_id = params['id']
      console.log(this.status_id)
      this.projectService.filtered_projects.subscribe(ps => {
        this.projects = ps.filter(p => {
          return p.status_id == this.status_id
        })
      })
    })

  }

}
