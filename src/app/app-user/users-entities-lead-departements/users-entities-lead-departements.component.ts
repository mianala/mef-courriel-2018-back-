import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-users-entities-lead-departements',
  templateUrl: './users-entities-lead-departements.component.html',
  styleUrls: ['./users-entities-lead-departements.component.scss']
})
export class UsersEntitiesLeadDepartementsComponent implements OnInit {
  @Input() entity

  constructor() {
  }

  ngOnInit() {
  }

}
