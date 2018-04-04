import {Component, OnInit} from '@angular/core';
import {TemplateService} from "../service/template.service";

@Component({
  selector: 'app-template-page',
  templateUrl: './template-page.component.html',
  styleUrls: ['./template-page.component.scss']
})
export class TemplatePageComponent implements OnInit {
  templates

  constructor(private templateService: TemplateService) {
    templateService.templates.subscribe(templates => {
      this.templates = templates
    })
  }

  ngOnInit() {
  }

}
