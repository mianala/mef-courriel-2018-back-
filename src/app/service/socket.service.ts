import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { EnvService } from './env.service';
import { FlowService } from './flow.service';
import { ProjectService } from './project.service';
import { NotificationService } from './notification.service';
import { UserService } from './user.service';

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
        // console.log('socket can connect')
        this.entity_id = user['entity_id'].toString()
        socket.on('connect', () => {
          socket.on('new project', (content) => {
            console.log(content);
            const participants = content.participants;
            if (participants.includes(this.entity_id)) {
              this.projectService.addProject(content.project)
              this.notification.projectSaved();
            }
          });

          // socket.on('project edited', (content) => {
          //   console.log('Socket new project');
          //   console.log(content);
          //   const participants = content.participants;
          //   if (participants.includes(this.entity_id)) {
          //     this.projectService.getLatestProjects()
          //   }
          // });

          socket.on('project treated', (content) => {
            console.log(content);
            const participants = content.participants;
            if (participants.includes(this.entity_id)) {
              this.projectService.updateProject(content.project)
            }
          });

          socket.on('reply', (content) => {
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
            if (participants.includes(this.entity_id)) {
              this.flowService.getAllFlows();
              this.notification.flowTreated()
            }
          });

          socket.on('project treated', (content) => {
            console.log(this.entity_id);
            console.log(content);
            const participants = content.participants;
            if (participants.includes(this.entity_id)) {
              this.projectService.updateProject(content.project);
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
