import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'app/service/project.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  doc_id
  projects
  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.doc_id = params['id']
      this.projectService.filtered_projects.subscribe(ps => {
        this.projects = ps.filter(p => {
          if (this.doc_id == '05') {
            return p.status_id == 5
          }
          return p.type_id == this.doc_id
        })
      })
    })

  }

}
