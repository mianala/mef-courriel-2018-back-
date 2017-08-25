import {Component, OnInit} from '@angular/core';
import {fadeInAnimation} from '../../animation/fadeIn'
import {EntityService} from "../../entity.service";

@Component({
  selector: 'app-sign-up-page',
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {
  entities = []
  user: any

  constructor(private entity: EntityService) {
    this.user = {}
    entity.getEntities().subscribe(entities => {
      this.entities = entities
    })
  }

  ngOnInit() {
  }

  avatarSelected(file) {
    this.user.avatar = file
  }

  submit() {
    console.log(this.user);
  }

}
