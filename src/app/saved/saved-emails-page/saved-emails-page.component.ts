import {Component, OnInit} from '@angular/core';
import {SavedService} from '../../saved.service';
import {fadeInAnimation} from '../../animation/fadeIn'
import {isEmpty} from "rxjs/operator/isEmpty";

@Component({
  selector: 'app-saved-emails-page',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './saved-emails-page.component.html',
  styleUrls: ['./saved-emails-page.component.scss']
})
export class SavedEmailsPageComponent implements OnInit {
  saveds: any

  constructor(private savedService: SavedService) {
    this.saveds = []
  }

  ngOnInit() {

    this.savedService.saveds.subscribe(result => {
      this.saveds = result
    })
  }


}
