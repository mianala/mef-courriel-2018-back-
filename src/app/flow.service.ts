import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class FlowService {
  url = 'http://localhost:3000/api/flows';

  constructor(private http: Http) {
  }

  getFlows() {
    return this.http.get(this.url)
      .map(res => res.json())
  }

  getUnseenFlowsNumber() {
    return this.http.get(this.url + '/unseen-flows-number')
    // .map(res => res.json())
  }

  getFlow(id: number) {
    return this.http.get(this.url + '/' + id)
      .map(res => res.json())
  }


  selectFlow() {

  }
}
