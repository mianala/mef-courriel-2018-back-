import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {EnvService} from "./env.service";

@Injectable()
export class SocketService {
  public io = io(EnvService.ip());
}
