import { Injectable } from '@angular/core';
import { GlobalService } from './service/global.service';
import { NotificationService } from './service/notification.service';
import { UserService } from './service/user.service';
import { FilterService } from './service/filter.service';
import { XhrService } from './service/xhr.service';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './service/env.service';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  url: string;
  user;

  constructor(private global: GlobalService, private notification: NotificationService,
    private userService: UserService, private filterService: FilterService,
    private xhr: XhrService,
    private http: HttpClient) {
    this.url = EnvService.ip() + '/api/prints';
    this.userService.user.subscribe(user => {
      if (user['id']) {
        this.user = user;
      }
    });
  }
  // export all projects
  exportALL() {
    this.http.post(this.url + '/export-all', { entity_id: this.user.entity_id })
      .subscribe(result => {
        console.log(result)
        window.open(EnvService.ip() + '/exports/' + result, '_blank')
      })
  }
}
