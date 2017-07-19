import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {NotificationService} from "./notification.service";

@Injectable()
export class EmailService {
  url = 'http://localhost:3000/api/flows/';

  constructor(private http: Http, private notification: NotificationService) {
  }

  getEmails(flowId: number) {
    return this.http.get(this.url + flowId + '/emails')
      .map(res => res.json())
  }

  sendEmail() {
    this.notification.emailSent();
  }
}
