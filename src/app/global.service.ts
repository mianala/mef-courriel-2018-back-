import {Injectable} from '@angular/core';

@Injectable()
export class GlobalService {

  ip() {
    return 'http://localhost:5000'
    // return 'http://192.168.90.90:5000'
    // return 'http://192.2.27.69:3000'
  }

  constructor() {
  }


}
