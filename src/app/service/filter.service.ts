import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FilterService {

  query = new BehaviorSubject('')
  filters = new BehaviorSubject({
    year: '',
    start_date: '',
    end_date: '',
    status: '',
  });

  direction = new BehaviorSubject(0);

  static searchProject(projects, query) {

    const filtered = projects.filter(project => {
      let result = false;
      if (project.sender) {
        result = result || project.sender.toLowerCase().includes(query.toLowerCase())
      }
      if (project.content) {
        result = result || project.content.toLowerCase().includes(query.toLowerCase())
      }
      if (project.ref) {
        result = result || project.ref.toLowerCase().includes(query.toLowerCase())
      }
      if (project.n_arrive) {
        result = result || project.n_arrive.toLowerCase().includes(query.toLowerCase())
      }
      if (project.numero) {
        result = result || project.numero.toLowerCase().includes(query.toLowerCase())
      }
      if (project.title) {
        result = result || project.title.toLowerCase().includes(query.toLowerCase())
      }
      if (project.n_project) {
        result = result || project.n_project.toString().includes(query.toLowerCase())
      }
      return result
    });

    return filtered
  }

  static filterProjects(projects, filter) {
    const filtered = projects.filter(project => {
      let result = true;
      if (filter.start_date) {
        result = result && (project.received_date > filter.start_date)
      }
      if (filter.end_date) {
        result = result && (project.received_date < filter.end_date)
      }
      if (filter.status) {
        result = result && (project.status_id == filter.status)
      }

    })

    return filtered
  }

  static filterFlows(flows, filter) {
    const filtered = flows.filter(flow => {
      let result = true;
      if (filter.start_date) {
        result = result && (flow.date > filter.start_date)
      }
      if (filter.end_date) {
        result = result && (flow.date < filter.end_date)
      }
      if (filter.status) {
        result = result && (flow.status_id == filter.status)
      }

    })

    return filtered
  }

  static searchFlow(flows, query) {

    const filtered = flows.filter(flow => {
      let result = false;
      if (flow.sender_entity_label) {
        result = result || flow.sender_entity_label.toLowerCase().includes(query.toLowerCase())
      }
      if (flow.content) {
        result = result || flow.content.toLowerCase().includes(query.toLowerCase())
      }
      if (flow.entity_label) {
        result = result || flow.entity_label.toLowerCase().includes(query.toLowerCase())
      }
      if (flow.numero) {
        result = result || flow.numero.toLowerCase().includes(query.toLowerCase())
      }
      if (flow.project_title) {
        result = result || flow.project_title.toLowerCase().includes(query.toLowerCase())
      }
      if (flow.project_ref) {
        result = result || flow.project_ref.toLowerCase().includes(query.toLowerCase())
      }
      if (flow.project_n) {
        result = result || flow.project_n.toString().includes(query.toLowerCase())
      }
      if (flow.project_numero) {
        result = result || flow.project_numero.toString().includes(query.toLowerCase())
      }
      if (flow.destination) {
        result = result || flow.destination.toLowerCase().includes(query.toLowerCase())
      }
      return result
    });

    return filtered
  }


  //  PROJECTS
  static newProject(project) {
    return project.dispatched != 1 && project.status_id != 1
  }

  static treatedProject(project) {
    return project.status_id != 0
  }

  // FLOWS

  static treatedFlow(flow, entity) {
    return flow.status_id == 1 && flow.entity_id == entity.id
  }

  static sentFlow(flow, entity) {
    return flow.sender_entity_id == entity.id
  }

  static receivedFlow(flow, entity) {
    return flow.sender_entity_id !== entity.id
  }

  static newFlow(flow, entity) {
    return flow.entity_id == entity.id && flow.status_id != 1
  }

  // ENTITY FLOWS
  static downFlow(flow) {
    // 1-2 -> 1-2-2
    return flow.entity.includes(flow.sender_entity + '-')
  }

  static upFlow(flow) {
    // 1-2-2 -> 1-2
    return flow.sender_entity.includes(flow.entity + '-')
  }


  // ENTITY NETWORK
  static fitlerRelativeEntities(entities, activeEntity) {

    let array = activeEntity['entity'].split('-');
    const level = array.length;
    const attached = array[level - 2] == '0';

    if (attached) {
      // array.splice(-1, 2) not working?
      array.pop()
      array.pop()
    } else {
      array.splice(-1, 1)
    }
    let query = array.join('-')
    let relative = RegExp('^' + query + '(-0)?-\\d+$')

    const filtered = entities.filter(entity => {
      return relative.test(entity.entity) && entity.entity != activeEntity['entity']
      // regex
    })
    return filtered
  }

  static fitlerUpEntities(entities, activeEntity) {
    let array = activeEntity['entity'].split('-');
    const level = array.length;
    const attached = array[level - 2] == '0';

    if (attached) {
      array.pop()
      array.pop()
    } else {
      array.splice(-1, 1)
    }

    let label = array.join('-')

    const filtered = entities.filter(entity => {
      return entity.entity == label
    })

    return filtered
  }

  static fitlerDownEntities(entities, activeEntity) {
    let down = RegExp('^' + activeEntity.entity + '-(0-)?\\d+$')
    const filtered = entities.filter(entity => {
      return down.test(entity.entity)
      // regex
    })

    return filtered
  }

}

