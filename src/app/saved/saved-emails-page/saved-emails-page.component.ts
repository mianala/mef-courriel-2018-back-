import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class SavedEmailsPageComponent implements OnInit, OnDestroy {
  saveds: any
  connection;

  constructor(private savedService: SavedService) {
    this.saveds = []
  }

  ngOnInit() {

    this.connection = this.savedService.saveds.subscribe(result => {
      this.saveds = result
    })
  }

  ngOnDestroy(){
    this.connection.unsubscribe()
  }


}
