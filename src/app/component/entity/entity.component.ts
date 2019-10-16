import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {
  @Input() entity
  constructor() { }

  ngOnInit() {
  }
  call(id) {

  }
}
