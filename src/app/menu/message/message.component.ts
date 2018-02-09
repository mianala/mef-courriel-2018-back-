import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message

  constructor() { }

  ngOnInit() {
    this.message.type = 'up'
  }

}
