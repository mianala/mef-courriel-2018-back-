import {Component, OnInit} from '@angular/core';
import {ThreadService} from "../../thread/thread.service";
import {ProjectService} from "../../projects/project.service";

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent implements OnInit {
  threads

  constructor(private threadService: ThreadService,private projectService:ProjectService) {
    this.threads = []
  }

  ngOnInit() {

    this.threadService.threads.subscribe(threads => {
      console.log(threads)
      this.threads = threads
    })}

}
