import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EntityService} from '../../service/entity.service';

@Component({
  selector: 'app-entity-filter',
  templateUrl: './entity-filter.component.html',
  styleUrls: ['./entity-filter.component.scss']
})
export class EntityFilterComponent implements OnInit {

  @Output() selectEntity = new EventEmitter()
  directions = []
  services = []
  filteredServices = []

  constructor(private entity: EntityService) {
    entity.getDirections().subscribe(directions => {
      this.directions = directions
      entity.getServices().subscribe(services => {
        this.services = services.concat(this.directions)
        this.filteredServices = this.services.filter(service => {
          return service.entity.toLowerCase().indexOf('1-3-0') > -1;
        })
        this.directions[0].checked = true
        this.filteredServices.unshift(this.directions[0])
      })
    })

  }

  filterService(query) {
    return this.services.filter(service => {
        if (query === '1-3') {
          return service.entity.toLowerCase().indexOf('1-3-0') > -1;
        } else {
          return service.entity.toLowerCase().indexOf(query.toLowerCase() + '-') > -1;
        }
      }
    )
  }

  selectDirection(direction) {
    this.filteredServices = this.filterService(direction.entity)
    direction.checked = true
    this.filteredServices.unshift(direction)
    this.selectEntity.emit(direction)
  }

  selectService(service) {
    this.selectEntity.emit(service)
  }

  ngOnInit() {

  }

}
