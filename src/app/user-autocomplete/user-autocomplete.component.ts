import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-autocomplete',
  templateUrl: './user-autocomplete.component.html',
  styleUrls: ['./user-autocomplete.component.scss']
})
export class UserAutocompleteComponent implements OnInit {
  userCtrl: FormControl;

  filteredUsers: any;

  users = [];

  constructor(private userService: UserService) {
  }

  filterUsers(val: string) {
    return val ? this.users.filter(user => user.name.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.users;
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
    this.userCtrl = new FormControl();
    this.filteredUsers = this.userCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterUsers(name));
  }

}
