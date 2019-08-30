import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { BehaviorSubject } from "rxjs";
import { EnvService } from "./env.service";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TemplateService {

  url: string
  templates = new BehaviorSubject([])

  constructor(private http: HttpClient) {
    this.url = EnvService.ip() + '/api/files';
    this.getTemplates()
  }

  getTemplates() {
    this.http.get<any>(this.url + '/templates').subscribe(templates => {
      this.templates.next(templates)
    })
  }

}
