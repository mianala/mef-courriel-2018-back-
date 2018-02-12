import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {UserService} from './user.service';
import {GlobalService} from './global.service';
import {NotificationService} from './notification.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class MessageService {

  url: string;
  user

  messages = new BehaviorSubject([])
  sentMessages = new BehaviorSubject([])
  message = new BehaviorSubject([])
  messageData = new BehaviorSubject({})

  constructor(private http: Http,
              private userService: UserService,
              private notification: NotificationService, private global: GlobalService) {
    this.url = global.ip() + '/api/messages';

    this.userService.user.subscribe(user => {
      if (user['id']) {

        this.user = user
        this.getMessages()
      }
    })
  }

  getMessages() {
    console.log('loading messages')

    this.http.get(this.url + '/entity/' + this.user.entity_id)
      .map(res => res.json()).subscribe(messages => {

      messages.sort(function (b, a) {
        const c = a.id;
        const d = b.id;
        return c - d;
      });

      const received_messages = messages.filter(message => message.sender_entity.id !== this.user.entity.id)
      const sentMessages = messages.filter(message => message.sender_entity.id === this.user.entity.id)

      console.log('we got our messages')

      this.messages.next(received_messages)
      this.sentMessages.next(sentMessages)
    })
  }


  getMessage(id) {
    console.log('loading messages')

    this.http.get(this.url)
      .map(res => res.json()).subscribe(messages => {

      messages.sort(function (b, a) {
        const c = a.id;
        const d = b.id;
        return c - d;
      });
      this.messages.next(messages)
    })
  }


  send(message) {
    console.log(this.user)

    return new Promise((resolve, reject) => {
      const formData: any = new FormData()
      const xhr = new XMLHttpRequest()

      formData.append('flow_id', message.flow_id)
      formData.append('entity_id', message.entity_id)
      formData.append('sender_entity_id', this.user.entity.id)
      formData.append('content', message.content)

      for (let i = 0; i < message.files.length; i++) {
        formData.append('files', message.files[i], message.files[i].name)
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST', this.url, true);
      xhr.send(formData)
      this.notification.answered()
    });
  }
}
