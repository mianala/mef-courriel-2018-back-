import {Component, OnInit} from '@angular/core';
import {ThreadService} from "../../thread/thread.service";
import {ProjectService} from "../../projects/project.service";
import {MessageService} from "../../message.service";

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent implements OnInit {
  threads
  messages

  constructor(private threadService: ThreadService,
              public projecService: ProjectService,
              public messageService: MessageService) {
    threadService.threads.subscribe(threads => {
      console.log(threads)
      this.threads = threads
    })

    this.messageService.sentMessages.subscribe(messages => {
      this.messages = messages.sort(function (b, a) {
        const c = a.n_depart;
        const d = b.n_depart;
        return c - d;
      });
    })
  }

  ngOnInit() {
  }

}
