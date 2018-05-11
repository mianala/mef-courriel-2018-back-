import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {EnvService} from './env.service';
import {EntityService} from './entity.service';
import {FlowService} from './flow.service';
import {ProjectService} from './project.service';
import {NotificationService} from './notification.service';
import {UserService} from './user.service';

@Injectable()
export class SocketService {
  public io = io(EnvService.ip());

  entity_id;

  constructor(private userService: UserService,
              private flowService: FlowService,
              private notification: NotificationService,
              private projectService: ProjectService) {

    const socket = this.io;

    this.entity_id = 1;

    this.userService.user.subscribe(user => {

      if (user) {
        this.entity_id = user['entity_id']
      }
    });

    socket.on('connect', () => {
        console.log('Socket connected');
        socket.on('new project', (content) => {
          console.log('Socket new project');
          console.log(content);
          if (!this.entity_id) {
            return
          }
          const participants = content.participants;
          if (participants.includes(this.entity_id.toString())) {
            this.projectService.getAllProjects()
          }
        });

        socket.on('project treated', (content) => {
          console.log('Socket project treated');
          console.log(content);
          if (!this.entity_id) {
            return
          }
          const participants = content.participants;
          if (participants.includes(this.entity_id)) {
            this.projectService.getAllProjects()
          }
        });

        socket.on('reply', (content) => {
          console.log('Socket reply sent');
          console.log(content);
          if (!this.entity_id) {
            return
          }
          const participants = content.participants;

          if (participants[0] == this.entity_id.toString()) {
            this.flowService.getAllFlows()
          } else if (participants.includes(this.entity_id.toString())) {
            this.flowService.getAllFlows();
            this.notification.flowReceived()
          }
        });

        socket.on('flow treated', (content) => {
          console.log(content);
          if (!this.entity_id) {
            return
          }

          const participants = content.participants;
          console.log('Socket flow treated');
          if (participants.includes(this.entity_id)) {
            this.flowService.getAllFlows();
            this.notification.flowTreated()
          }
        });

        socket.on('flow shipped', (content) => {
          console.log('Socket flow shipped');
          console.log(content);
          if (!this.entity_id) {
            return
          }

          const participants = content.participants;
          if (participants.includes(this.entity_id.toString())) {
            this.flowService.getAllFlows();
            this.notification.flowExported()
          }
        });

        socket.on('flow imported', (content) => {
          console.log('Socket flow imported');
          console.log(content);
          if (!this.entity_id) {
            return
          }

          const participants = content.participants;
          if (participants.includes(this.entity_id.toString())) {
            this.flowService.getAllFlows();
            this.notification.flowImported()
          }
        });

        socket.on('project treated', (content) => {
          console.log(this.entity_id);
          console.log(content);
          if (!this.entity_id) {
            return
          }
          const participants = content.participants;
          if (participants.includes(this.entity_id)) {
            this.projectService.getAllProjects();
            this.notification.projectTreated()
          }
        });

        socket.on('dispatch', (content) => {
          console.log(content);
          if (!this.entity_id) {
            return
          }
          const participants = content.participants;

          if (participants.includes(this.entity_id.toString())) {
            this.flowService.getAllFlows();
            if (participants[0] != this.entity_id.toString()) {
              this.notification.flowReceived()
            }
          }
        });
        socket.on('project composed', (content) => {
          console.log(this.entity_id);
          console.log('Socket project composed');
          console.log(content);
          if (!this.entity_id) {
            return
          }
          const participants = content.participants;
          if (participants.includes(this.entity_id.toString())) {
            this.flowService.getAllFlows();
            if (participants[0] != this.entity_id.toString()) {
              this.notification.flowReceived()
            }
          }
        });

        socket.on('message', (msg) => {
          console.log(msg);
          this.flowService.getAllFlows()
        })
      }
    )
  }
}
