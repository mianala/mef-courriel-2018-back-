import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'app/service/project.service';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})
export class FoldersComponent implements OnInit {
  isLinear = false;
  projects = [];
  year
  momth
  week
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  _formBuilder: any;


  constructor(private projectService: ProjectService) {
    this.projectService.all_projects.subscribe(ps => {
      this.projects = ps
    })
  }

  ngOnInit() {

  }

}
