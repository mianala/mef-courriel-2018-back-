import {Component, OnInit} from '@angular/core';
import {fadeInAnimation} from '../../animation/fadeIn'
import {EntityService} from '../../service/entity.service';
import {UserService} from '../../service/user.service';

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


  constructor(public entity: EntityService,
              private userService: UserService) {
    this.user = {
      functionId: 3
    }

    this.entity.entities.subscribe(e => {
      this.entities = e
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
