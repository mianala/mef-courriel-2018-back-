import {Injectable} from '@angular/core';
import {NotificationService} from "./notification.service";
import {GlobalService} from "./global.service";
import {Http} from "@angular/http";

@Injectable()
export class TestService {
  url: string

  constructor(private http: Http, private global: GlobalService, private notification: NotificationService) {
    this.url = global.ip() + '/api/test';

  }

  get () {
    return this.http.get(this.url)
      .map(res => res.json())
  }
}
