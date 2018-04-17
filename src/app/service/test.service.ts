import {Injectable} from '@angular/core';
import {NotificationService} from "./notification.service";
import {GlobalService} from "./global.service";
import {Http} from "@angular/http";
import {EnvService} from "./env.service";

@Injectable()
export class TestService {
  url: string

  constructor(private http: Http) {
    this.url = EnvService.ip() + '/api/test';

  }

  get() {
    return this.http.get(this.url)
      .map(res => res.json())
  }
}
