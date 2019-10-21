import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'app/service/project.service';
import { FilterService } from 'app/service/filter.service';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})
export class FoldersComponent implements OnInit {
  isLinear = false;
  projects = [];
  year
  month
  week = -1
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  _formBuilder: any;
  startDate
  endDate

  constructor(private projectService: ProjectService, private filterService: FilterService) {

  }

  ngOnInit() {

  }
  filter() {
    let sd = this.year + '-' + this.month + '-01'
    const date_format = 'YYYY-MM-DD'
    let ed = this.year + '-' + (this.month + 1) + '-01'
    if (this.month == 12) {
      ed = (this.year + 1) + '-1-1'
    }
    if (this.week != -1) {
      const eday = this.week * 7 + 1
      const sday = eday - 7
      sd = this.year + '-' + this.month + '-' + sday
      if (this.week != 4) {
        ed = this.year + '-' + this.month + '-' + eday
      }
    }

    const f = {
      startDate: new Date(sd),
      endDate: new Date(ed)
    }
    this.projectService.all_projects.subscribe(ps => {
      this.projects = FilterService.filterFolders(ps, f)
    })
  }

  selectYear(year) {
    this.year = year
  }
  selectMonth(month) {
    this.month = month
    this.filter()
  }
  selectWeek(week) {
    this.week = week
    this.filter()
  }

}
