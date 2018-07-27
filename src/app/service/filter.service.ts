import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class FilterService {

  query = new BehaviorSubject('');
  direction = new BehaviorSubject(0);

  static filterProject(projects, query) {

    const filtered = projects.filter(project => {
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
      if (project.n_project != null) {
        result = result || project.n_project.toString().includes(query.toLowerCase())
      }
      return result
    });

    return filtered
  }

  static filterFlow(flows, query) {

    const filtered = flows.filter(flow => {
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
      if (flow.project_title != null) {
        result = result || flow.project_title.toLowerCase().includes(query.toLowerCase())
      }
      if (flow.project_ref != null) {
        result = result || flow.project_ref.toLowerCase().includes(query.toLowerCase())
      }
      if (flow.project_n != null) {
        result = result || flow.project_n.toString().includes(query.toLowerCase())
      }
      if (flow.project_numero != null) {
        result = result || flow.project_numero.toString().includes(query.toLowerCase())
      }
      if (flow.destination != null) {
        result = result || flow.destination.toLowerCase().includes(query.toLowerCase())
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

  static treatedProject(project) {
    return project.status_id == 1
  }

  static shippedProjects(projects) {
    return projects.filter(project => {
      return project.status_id == 3
    })
  }

  static treatedFlows(flows,entity) {
    return flows.filter(flow => {
      return FilterService.treatedFlow(flow,entity)
    })
  }

  static treatedFlow(flow,entity) {
    return flow.status_id == 1 && flow.entity_id == entity.id
  }

  static shippedFlow(flows) {
    return flows.filter(flow => {
      return FilterService.isShipped(flow)
    })
  }

  static isShipped(flow) {
    return flow.direction == 3
  }

  static isSent(flow, entity) {
    return flow.sender_entity_id == entity.id && flow.direction == 1
  }

  static isImported(flow) {
    return flow.direction == 4
  }

  static within(flow) {
    return flow.direction == 1
  }

  static sentFlow(flows, entity) {
    return flows.filter(flow => {
      return this.isSent(flow, entity)
    })
  }

  static importedFlow(flows) {
    return flows.filter(flow => {
      return this.isImported(flow)
    })
  }

  static downFlow(flow) {
    // 1-2 -> 1-2-2
    return flow.entity.includes(flow.sender_entity + '-')
  }

  static upFlow(flow) {
    // 1-2-2 -> 1-2
    return flow.sender_entity.includes(flow.entity + '-')
  }

  static relativeFlow(flow) {
    // 1-2-2 -> 1-2-0-2 / 1-2-3 not up not down

  }

  static inbox(flows, entity) {

    return flows.filter((flow) => {
      return FilterService.received(flow, entity)
    })
  }

  static received(flow, entity) {
    return flow.entity_id == entity.id && flow.status_id != 1 && flow.direction == 1
  }

}
