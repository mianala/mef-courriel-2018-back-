import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {EnvService} from "./env.service";
import {EntityService} from "./entity.service";
import {FlowService} from "./flow.service";
import {ProjectService} from "./project.service";
import {NotificationService} from "./notification.service";
import {UserService} from "./user.service";

@Injectable()
export class SocketService {
  public io = io(EnvService.ip());

  entity

  constructor(private userService: UserService,
              private flowService: FlowService,
              private notification: NotificationService,
              private projectService: ProjectService) {

    const socket = this.io;

    this.entity = 1

    this.userService.user.subscribe(user => {

      if (user) {
        this.entity = user['entity_id']
      }
    })

    socket.on('connect', () => {
        console.log('Socket connected');
        socket.on('new project', (content) => {


          console.log(this.entity);
          console.log('Socket new project');
          console.log(content);
          if(!this.entity){
            return
          }
          const participants = content.participants
          if (participants.includes(this.entity.toString())) {
            this.projectService.getAllProjects()
          }
        });

          console.log(this.entity);
        socket.on('project treated', (content) => {
          console.log(content);
          if(!this.entity){
            return
          }
          const participants = content.participants
          if (participants.includes(this.entity)) {
            this.projectService.getAllProjects()
          }
        });

        socket.on('reply', (content) => {
          console.log(this.entity);
          console.log('Socket reply sent');
          console.log(content);
          if(!this.entity){
            return
          }
          const participants = content.participants

          if (participants[0] == this.entity.toString()) {
            this.flowService.getSentFlows();
          } else if (participants.includes(this.entity.toString())) {
            this.flowService.getFlows()
          }
        });

          console.log(this.entity);
        socket.on('flow treated', (content) => {
          console.log(content);
          if(!this.entity){
            return
          }

          const participants = content.participants
          console.log('Socket flow treated');
          if (participants.includes(this.entity)) {
            this.flowService.getFlows()
            this.flowService.getTreatedFlows()
            this.notification.flowTreated()
          }
        });

        socket.on('project treated', (content) => {
          console.log(this.entity);
          console.log('Socket project treated');
          console.log(content);
          if(!this.entity){
            return
          }
          const participants = content.participants
          if (participants.includes(this.entity)) {
            this.projectService.getAllProjects()
            this.notification.projectTreated()
          }
        });

        socket.on('dispatch', (content) => {
          console.log(this.entity);
          console.log('Socket dispatch heard');
          console.log(content);
          if(!this.entity){
            return
          }
          const participants = content.participants

          if (participants[0] == this.entity.toString()) {
            this.projectService.getAllProjects();
            this.flowService.getSentFlows();
          } else if (participants.includes(this.entity.toString())) {
            this.flowService.getFlows()
          }
        });
        socket.on('project composed', (content) => {
          console.log(this.entity);
          console.log('Socket project composed');
          console.log(content);
          if(!this.entity){
            return
          }
          const participants = content.participants

          if (participants[0] == this.entity.toString()) {
            this.flowService.getSentFlows();
          } else if (participants.includes(this.entity.toString())) {
            this.flowService.getFlows()
          }
        });

        socket.on('message', (msg) => {
          console.log(msg);
          this.flowService.getTreatedFlows();
          this.flowService.getShippedFlows()
        })
      }
    )
  }
}
