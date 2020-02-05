import { Injectable } from '@angular/core';

@Injectable()
export class EnvService {

  static ip() {
    var protocol = location.protocol;
    var slashes = protocol.concat("//");
    var host = slashes.concat(window.location.hostname);

    // return 'http://localhost:5000'
    return host.concat(":5000")
    // return 'http://192.168.90.90:5000'
    // return 'http://192.2.27.69:3000'
  }

  constructor() {

  }

}
