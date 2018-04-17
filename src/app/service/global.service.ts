import {Injectable} from '@angular/core';

@Injectable()
export class GlobalService {

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
