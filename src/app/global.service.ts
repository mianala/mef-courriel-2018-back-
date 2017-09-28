import {Injectable} from '@angular/core';

@Injectable()
export class GlobalService {

  ip() {
    // return 'http://localhost:3000'
    return 'http://192.168.90.90:3000'
  }

  constructor() {
  }


}
