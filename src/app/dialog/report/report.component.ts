import {Component, OnInit} from '@angular/core';
import {FroalaService} from "../../froala.service";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  options: any
  report: any

  constructor(private froalaService: FroalaService,
              private userService: UserService) {
    this.options = froalaService.getOptions()
    this.report = {}
  }

  ngOnInit() {
  }

  isReunion()
  {
    return this.report.type === 2
  }

  isFormation()
  {
    return this.report.type === 3
  }

  isMission()
  {
    return this.report.type === 4
  }

}
