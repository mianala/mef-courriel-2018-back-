import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class FilterService {

  query = new BehaviorSubject('')
  direction = new BehaviorSubject(0)

  constructor() {
  }

}
