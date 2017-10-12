import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {GlobalService} from '../global.service';
import {UserService} from "../user.service";
import {XhrService} from "./xhr.service";

@Injectable()
export class ReportService {
  url
  user

  constructor(private http: Http,
              private userService: UserService,
              private xhrService: XhrService,
              private global: GlobalService) {
    this.url = global.ip() + '/api/reports';
    this.user = this.userService.user.getValue()
  }

  save(report) {
    this.xhrService.send(this.url, report, (result) => {
      console.log('report sent')
    })
  }
}
