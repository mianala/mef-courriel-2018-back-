import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {EnvService} from "./env.service";

@Injectable()
export class TemplateService {

  url: string
  templates = new BehaviorSubject([])

  constructor(private http: Http) {
    this.url = EnvService.ip() + '/api/files';
    this.getTemplates()
  }

  getTemplates(){
  	this.http.get(this.url+'/templates').map(res => res.json()).subscribe(templates => {
  		this.templates.next(templates)
  	})
  }

}
