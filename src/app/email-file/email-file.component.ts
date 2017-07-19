import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-email-file',
  templateUrl: './email-file.component.html',
  styleUrls: ['./email-file.component.scss']
})
export class EmailFileComponent implements OnInit {
  @Input() file;

  constructor() {
  }

  ngOnInit() {
  }

}
