import {Component, OnInit} from '@angular/core';
import {UserService} from './service/user.service';
import {Router} from '@angular/router';
import {SocketService} from "./service/socket.service";
import {ProjectService} from "./service/project.service";
import {ThreadService} from "./service/thread.service";
import {FlowService} from "./service/flow.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app'
  connected: boolean


  show

  constructor(public userService: UserService,
              public router: Router,
              public projectService: ProjectService,
              public flowService: FlowService,
              public socketService: SocketService) {
  }

  ngOnInit() {
    const socket = this.socketService.io
    socket.on('connect', () => {
      console.log('Socket connected')
      socket.on('message', (msg) => {
        console.log(msg)
        this.projectService.getProjects()
        this.projectService.getDispatchedProjects()
        this.flowService.getFlows()
        this.flowService.getSentFlows()
        this.flowService.getShippedFlows()
      })
    })
    // todo wait for a little before redirecting

    // todo user login
  }


}
