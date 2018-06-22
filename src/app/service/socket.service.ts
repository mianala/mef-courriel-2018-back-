import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {EnvService} from './env.service';
import {FlowService} from './flow.service';
import {ProjectService} from './project.service';
import {NotificationService} from './notification.service';
import {UserService} from './user.service';

@Injectable()
export class SocketService {

  entity_id;

  constructor(private userService: UserService,
              private flowService: FlowService,
              private notification: NotificationService,
              private projectService: ProjectService) {

    this.userService.user.subscribe(user => {

        if (!user['entity_id']) {
          return
        } else {

          const socket = io(EnvService.ip());
          console.log('socket can connect')
          this.entity_id = user['entity_id'].toString()
          socket.on('connect', () => {
            console.log('Socket connected');
            socket.on('new project', (content) => {
              console.log('Socket new project');
              console.log(content);
              const participants = content.participants;
              if (participants.includes(this.entity_id)) {
                this.projectService.getAllProjects()
              }
            });

            socket.on('project treated', (content) => {
              console.log('Socket project treated');
              console.log(content);
              const participants = content.participants;
              if (participants.includes(this.entity_id)) {
                this.projectService.getAllProjects()
              }
            });

            socket.on('reply', (content) => {
              console.log('Socket reply sent');
              console.log(content);
              const participants = content.participants;

              if (participants[0] == this.entity_id) {
                this.flowService.getAllFlows()
              } else if (participants.includes(this.entity_id)) {
                this.flowService.getAllFlows();
                this.notification.flowReceived()
              }
            });

            socket.on('flow treated', (content) => {
              console.log(content);

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

              const participants = content.participants;
              if (participants.includes(this.entity_id)) {
                this.flowService.getAllFlows();
                this.projectService.getAllProjects()
                this.notification.flowExported()
              }
            });

            socket.on('flow imported', (content) => {
              console.log('Socket flow imported');
              console.log(content);

              const participants = content.participants;
              if (participants.includes(this.entity_id)) {
                this.flowService.getAllFlows();
                this.notification.flowImported()
              }
            });

            socket.on('project treated', (content) => {
              console.log(this.entity_id);
              console.log(content);
              const participants = content.participants;
              if (participants.includes(this.entity_id)) {
                this.projectService.getAllProjects();
                this.notification.projectTreated()
              }
            });

            socket.on('dispatch', (content) => {
              console.log(content);
              const participants = content.participants;

              if (participants.includes(this.entity_id)) {
                this.flowService.getAllFlows();
                if (participants[0] != this.entity_id) {
                  this.notification.flowReceived()
                }
              }
            });
            socket.on('project composed', (content) => {
              console.log(this.entity_id);
              console.log('Socket project composed');
              console.log(content);
              const participants = content.participants;
              if (participants.includes(this.entity_id)) {
                this.flowService.getAllFlows();
                if (participants[0] != this.entity_id) {
                  this.notification.flowReceived()
                }
              }
            });

            socket.on('message', (msg) => {
              console.log(msg);
              this.flowService.getAllFlows()
            })

          })
        }
      }
    )
  }
}
