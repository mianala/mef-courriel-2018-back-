import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '[app-saved-email]',
  templateUrl: './saved-email.component.html',
  styleUrls: ['./saved-email.component.scss']
})
export class SavedEmailComponent implements OnInit {
  @Input() saved

  constructor() {
  }

  ngOnInit() {
  }

}
