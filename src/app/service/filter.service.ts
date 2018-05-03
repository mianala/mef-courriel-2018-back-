import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class FilterService {

  query = new BehaviorSubject('');
  direction = new BehaviorSubject(0);

  constructor() {
  }

  static filterProject(projects, query) {

    let filtered = projects.filter(project => {
      let result = false;
      if (project.sender != null) {
        result = result || project.sender.toLowerCase().includes(query.toLowerCase())
      }
      if (project.content != null) {
        result = result || project.content.toLowerCase().includes(query.toLowerCase())
      }
      if (project.ref != null) {
        result = result || project.ref.toLowerCase().includes(query.toLowerCase())
      }
      if (project.n_arrive != null) {
        result = result || project.n_arrive.toLowerCase().includes(query.toLowerCase())
      }
      if (project.n_arrive_dgb != null) {
        result = result || project.n_arrive_dgb.toLowerCase().includes(query.toLowerCase())
      }
      if (project.title != null) {
        result = result || project.title.toLowerCase().includes(query.toLowerCase())
      }
      return result
    });

    return filtered
  }

  static filterFlow(flows, query) {

    let filtered = flows.filter(flow => {
      let result = false;
      if (flow.sender_entity_label != null) {
        result = result || flow.sender_entity_label.toLowerCase().includes(query.toLowerCase())
      }
      if (flow.content != null) {
        result = result || flow.content.toLowerCase().includes(query.toLowerCase())
      }
      if (flow.entity_label != null) {
        result = result || flow.entity_label.toLowerCase().includes(query.toLowerCase())
      }
      if (flow.numero != null) {
        result = result || flow.numero.toLowerCase().includes(query.toLowerCase())
      }
      return result
    });

    return filtered
  }

  static savedProjects(projects) {

    return projects.filter(project => {
      return project.dispatched != 1 && project.status_id != 1
    })

  }

  static dispatchedProjects(projects) {

    return projects.filter(project => {
      return project.dispatched == 1 && project.status_id != 1
    })

  }

  static treatedProjects(projects) {

    return projects.filter(project => {
      return project.status_id == 1
    })

  }

}
