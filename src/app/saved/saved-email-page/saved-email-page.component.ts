import {Component, OnInit} from '@angular/core';
import {SavedService} from '../../saved.service';
import {fadeInAnimation} from '../../animation/fadeIn'


@Component({
  selector: 'app-saved-email-page',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './saved-email-page.component.html',
  styleUrls: ['./saved-email-page.component.scss']
})
export class SavedEmailPageComponent implements OnInit {
  saved
  savedId

  constructor(private savedService: SavedService) {
    this.savedService.saved.subscribe(saved => {
      this.saved = saved
    })
  }

  ngOnInit() {
    this.savedService.reload()
  }

}
