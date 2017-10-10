import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {

  @Input() id
  @Input() type
  constructor() { }

  ngOnInit() {
  }

}
