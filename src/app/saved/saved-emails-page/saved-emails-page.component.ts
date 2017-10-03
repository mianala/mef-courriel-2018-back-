import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {User} from '../../../models/User';
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

  constructor(private userService: UserService, private savedService: SavedService) {
  }

  ngOnInit() {

    this.userService.userObject.subscribe(data => {
      console.log('saved email got the active user')
      console.log(data)
      this.activeUser = data
      this.savedService.getSaveds(this.activeUser.id).subscribe(result => {

        result.sort(function (b, a) {
          const c: any = a.id;
          const d: any = b.id;
          return c - d;
        });
        this.saveds = result
      })
    })
  }

}
