import {Component, Input, OnInit} from '@angular/core';
import {SavedService} from "../../saved.service";

@Component({
  selector: '[app-saved-email]',
  templateUrl: './saved-email.component.html',
  styleUrls: ['./saved-email.component.scss']
})
export class SavedEmailComponent implements OnInit {
  @Input() saved

  constructor(private savedService: SavedService) {
  }

  ngOnInit() {
  }

  setSaved(id: number) {
    this.savedService.setSaved(id)
  }
}
