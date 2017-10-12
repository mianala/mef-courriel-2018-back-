import {Component, OnInit} from '@angular/core';
import {fadeInAnimation} from '../../animation/fadeIn'
import {EntityService} from '../../entity.service';
import {UserService} from '../../user.service';

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


  constructor(private entity: EntityService,
              private userService: UserService) {
    this.user = {
      functionId: 3
    }
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
    this.userService.saveUser(this.user);
  }

}
