import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {GlobalService} from "../global.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class TemplateService {

  url: string
  templates = new BehaviorSubject([])

  constructor(private http: Http,
              private global: GlobalService) {
    this.url = global.ip() + '/api/files';
  }

  getTemplates(){
  	this.http.get(this.url+'/templates').map(res => res.json()).subscribe(templates => {
  		this.templates.next(templates)
  	})
  }

}
