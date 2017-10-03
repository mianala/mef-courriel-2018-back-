import {Component, OnInit} from '@angular/core';
import {SavedService} from '../../saved.service';
import {fadeInAnimation} from '../../animation/fadeIn'

@Component({
  selector: 'app-saved-emails-page',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './saved-emails-page.component.html',
  styleUrls: ['./saved-emails-page.component.scss']
})
export class SavedEmailsPageComponent implements OnInit {
  saveds
  activeUser: any

  constructor(private savedService: SavedService) {
  }

  ngOnInit() {

    this.savedService.saveds.subscribe(result => {

      result.sort(function (b, a) {
        const c: any = a.id;
        const d: any = b.id;
        return c - d;
      });
      this.saveds = result
    })
  }

}
