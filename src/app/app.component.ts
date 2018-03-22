import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {SocketService} from "./service/socket.service";
import {ProjectService} from "./projects/project.service";
import {ThreadService} from "./thread/thread.service";
import {FlowService} from "./flow.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app'
  connected: boolean

  constructor(public userService: UserService,
              public router: Router,
              public projectService: ProjectService,
              public threadService: ThreadService,
              public flowService: FlowService,
              public socketService: SocketService) {
  }

  ngOnInit() {
    const socket = this.socketService.io
    socket.on('connect', () => {
      console.log('Socket connected')
      socket.on('message', (msg) => {
        console.log('Socket got some messages')
        this.projectService.getProjects()
        this.threadService.getThreads()
        this.flowService.getFlows()
      })
    })
    // todo wait for a little before redirecting

    // todo user login
  }


}
