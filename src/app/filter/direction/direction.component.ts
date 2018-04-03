import {Component, OnInit} from '@angular/core';
import {FilterService} from "../../filter.service";

@Component({
  selector: 'direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class DirectionComponent implements OnInit {
  direction: number

  constructor(public filterService: FilterService) {
  }

  ngOnInit() {
    this.filterService.direction.next(this.direction)
  }

}
