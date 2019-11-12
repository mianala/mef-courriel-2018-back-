import { Component, Input, OnInit } from '@angular/core';
import { FlowService } from '../service/flow.service';
import { EntityService } from '../service/entity.service';
import { DispatchComponent } from '../projects/dialog/dispatch/dispatch.component';
import { MatDialog } from '@angular/material';
import { ProjectService } from '../service/project.service';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { GlobalService } from '../service/global.service';
import { FilterService } from '../service/filter.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.scss']
})
export class FlowsComponent implements OnInit {
  @Input() flows;
  @Input() visibility: boolean;
  user;
  entity;
  relatives = [];


  // MatPaginator Inputs
  length = 0;

  paginator = GlobalService.paginator
  paginate = GlobalService.paginate
  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent();


  constructor(public router: Router,
    public flowService: FlowService,
    public userService: UserService,
    public entityService: EntityService,
    public filter: FilterService,
    public dialog: MatDialog,
    public projectService: ProjectService) {
    this.visibility = true;
    this.userService.user.subscribe(user => {
      this.user = user
    });

    this.entityService.entity.subscribe(entity => {
      this.entity = entity
    })

    this.entityService.relativeEntities.subscribe(entities => {
      this.relatives = entities
    })

    this.pageEvent.pageIndex = 0
    this.pageEvent.pageSize = this.paginator.pageSize

  }

  ngOnInit() {

  }

  treated(flow) {
    return FilterService.treatedFlow(flow, this.entity)
  }

  title_label(flow) {
    if (flow.type_id == 3 ) {
      return flow.entity_label
    }
    if (flow.destination) {
      return flow.destination
    }
    else if (flow.sender) {
      return flow.sender
    } else if (FilterService.sentFlow(flow, this.entity)) {
      return 'à ' + flow.entity_label
    } else if (FilterService.receivedFlow(flow, this.entity)) {
      return flow.sender_entity_label
    }
  }

  decommissionable(flow) {
    return false
    // return flow.direction == 1;
  }

  sameDay(flow) {
    return GlobalService.sameDay(new Date(flow.date), new Date())
  }

  forwardable(flow) {
    return this.entityService.relativeEntities.getValue().length
    // && FilterService.received(flow,this.user) && flow.sender_entity.length > flow.entity.length
  }

  viewable(flow) {
    return true
  }

  treatable(flow) {
    return flow.sender_entity_id != this.user.entity_id && flow.status_id != 1;
  }


  received(flow) {
    return FilterService.receivedFlow(flow, this.entity)
  }

  submitable(id) {
    return false
  }

  view(flow) {
    this.projectService.getProjectFromId(flow.project_id);
    this.router.navigateByUrl('/projet')
  }

  submit(flow) {
    this.flowService.setFlow(flow.id)
  }

  dispatch(flow) {
    console.log(flow)
    this.projectService.getProjectFromId(flow.project_id).subscribe(project => {
      this.dialog.open(DispatchComponent, {
        data: project
      });
    })


  }

  getFiles(flow, id) {
    this.flowService.getFlowFiles(flow.id, (files) => {
      this.flows[id].files = files
    })
  }
}
