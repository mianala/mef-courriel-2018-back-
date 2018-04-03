import {Component, OnInit} from '@angular/core';
import {FilterService} from "../../filter.service";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  query: string

  constructor(private filterService: FilterService) {

  }

  ngOnInit() {
  }

  updateQuery() {
    this.filterService.query.next(this.query)
  }

}
