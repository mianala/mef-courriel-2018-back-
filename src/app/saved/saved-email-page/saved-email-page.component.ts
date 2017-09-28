import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
  saved: {}
  savedId

  constructor(private route: ActivatedRoute, private savedService: SavedService) {
    this.saved = {}
    this.route.params.subscribe(params => {
      this.savedId = params.id
    })

    this.savedService.getSaved(this.savedId).subscribe(saved => {
      this.saved = saved
    })
  }

  ngOnInit() {

  }

}
