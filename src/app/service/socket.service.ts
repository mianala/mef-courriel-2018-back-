import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

  private url = 'http://192.168.90.90:5000';
  public io = io(this.url);
}
