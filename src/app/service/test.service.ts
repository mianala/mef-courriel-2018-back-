import {Injectable} from '@angular/core';
import {NotificationService} from "./notification.service";
import {GlobalService} from "./global.service";
import {Http} from "@angular/http";
import {EnvService} from "./env.service";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TestService {
  url: string

  constructor(private http: HttpClient) {
    this.url = EnvService.ip() + '/api/test';

  }

  get() {
    return this.http.get(this.url)
  }
}
