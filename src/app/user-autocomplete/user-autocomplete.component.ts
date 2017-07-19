import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import {FormControl} from '@angular/forms'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/map'
import {UserService} from '../user.service'
import {User} from "../../models/User"

@Component({
  selector: 'app-user-autocomplete',
  templateUrl: './user-autocomplete.component.html',
  styleUrls: ['./user-autocomplete.component.scss']
})
export class UserAutocompleteComponent implements OnInit {

  userCtrl: FormControl
  filteredUsers: any
  users = []
  @Output() userSelected = new EventEmitter()
  selectedUser: User

  constructor(private userService: UserService) {

  }

  filterUsers(val: string) {
    return val ? this.users.filter(
      user => {
        const lower = val.toString().toLowerCase()
        if (user.name.toLowerCase().indexOf(lower) === 0 || user.entity.toLowerCase().indexOf(lower) === 0) {
          return true
        } else {
          return false
        }
      }
      )
      : this.users
  }

  ngOnInit() {
    this.userCtrl = new FormControl()

    this.userService.getUsers().subscribe(data => {
      this.users = data

      this.filteredUsers = this.userCtrl.valueChanges
        .startWith(null)
        .map(user => this.filterUsers(user))
    })

  }

  displayFn(user: User) {
    return user ? user.name + ' ' + user.entity : user
  }

  selectUser(user: User) {
    this.userSelected.emit(user)
  }

}
