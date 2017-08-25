import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from '../../animation/fadeIn'

@Component({
  selector: 'app-public-home',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './public-home.component.html',
  styleUrls: ['./public-home.component.scss']
})
export class PublicHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
