import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() project

  constructor() {

  }

  ngOnInit() {
  }

}
