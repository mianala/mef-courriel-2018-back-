import {Injectable} from '@angular/core';

@Injectable()
export class GlobalService {

  constructor() {
  }

  ip() {
    return 'http://localhost:3000'
    // return 'http://192.2.27.69:3000'
  }

}
