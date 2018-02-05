import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {GlobalService} from './global.service';
import {NotificationService} from './notification.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from '../models/User';

@Injectable()
export class UserService {
  url: string
  options = new RequestOptions({withCredentials: true});
  user = new BehaviorSubject({
    entity_id: 0
  })
  connected = new BehaviorSubject(false)

  constructor(private http: Http,
              private route: Router,
              private global: GlobalService,
              private notification: NotificationService) {
    this.url = global.ip() + '/api/users';


    if (localStorage.getItem('user')) {
      this.user.next(JSON.parse(localStorage.getItem('user')))
    } else {
      this.connect()
    }


    this.user.subscribe(user => {
      if (user.id) {
        this.connected.next(true)
      } else {
        this.connected.next(false)
      }
    })
  }


  login(id: string, password: string) {
    this.http
      .post(
        this.url + '/user',
        {
          id: id,
          password: password
        }, this.options)
      .map(res => res.json())
      .subscribe(user => {
        if (user.error) {
          this.notification.print(user.error)
        }
        this.connect()

      })
  }

  connect() {

    // de redirect to login
    this.http.post(this.url + '/user', {type: 'user'}, this.options)
      .map(res => res.json())
      .subscribe(user => {
        this.user.next(user)
      })
  }

  redirectIfConnected() {
    this.user.subscribe(user => {
      if (user.id) {
        this.route.navigateByUrl('/public')
      }
    })
  }


  saveUser(user ?: any) {

    this.route.navigateByUrl('/public/connexion')
    this.notification.userSaved()
    this.post(user).then((result) => {
      console.log(result)

    }, (error) => {
      console.log(error)
    })

  }

  post(user: any) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData()
      const xhr = new XMLHttpRequest()
      formData.append('entityId', user.entity.id)
      formData.append('im', user.im)
      formData.append('username', user.username)
      formData.append('functionId', user.functionId)
      formData.append('name', user.name)
      formData.append('fullname', user.fullname)
      formData.append('title', user.functionTitle)
      formData.append('email', user.email)
      formData.append('password', user.password)
      if (user.avatar) {
        formData.append('avatar', user.avatar, user.avatar.name)
      }


      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST', this.url, true);
      xhr.send(formData)
      // this.notification.user()
    });
  }

  getUsers() {
    return this.http.get(this.url, this.options)
      .map(res => res.json())
  }

  getUsersByEntity(entity) {
    return this.http.get(this.url + '/entity/' + entity, this.options)
      .map(res => res.json())
  }

  getUser(id: number) {
    return this.http.get(this.url + '/' + id, this.options)
      .map(res => res.json())
  }

  logout() {
    console.log('loggin out')
    this.http.post(this.url + '/user', {type: 'logout'}, this.options)
      .map(res => res.json()).subscribe(data => {
      localStorage.clear()
      this.user.next(new User())
      this.notification.loggedOut()
      this.route.navigateByUrl('/public')
    });
  }


}
