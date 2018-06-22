import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {EntityService} from '../../service/entity.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  user
  entity

  constructor(private userService: UserService,private entityService: EntityService,) {
    userService.user.subscribe(user => {
      this.user = user
    })

    entityService.entity.subscribe(entity => {
      this.entity = entity
    })

  }

  ngOnInit() {
  }

}
