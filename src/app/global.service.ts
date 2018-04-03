import {Injectable} from '@angular/core';

@Injectable()
export class GlobalService {

  ip() {
    return 'http://41.188.43.53:5000'
    // return 'http://localhost:5000'
    // return 'http://192.168.90.90:5000'
    // return 'http://192.2.27.69:3000'
  }

  constructor() {
  }


  toOracleDate(in_date) {
    let date = new Date(in_date)
    return `${date.getFullYear()}/${this.addZero(date.getMonth() + 1)}/${this.addZero(date.getDate())}`
  }

  addZero(i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }

}
