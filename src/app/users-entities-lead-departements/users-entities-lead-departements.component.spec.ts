import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEntitiesLeadDepartementsComponent } from './users-entities-lead-departements.component';

describe('UsersEntitiesLeadDepartementsComponent', () => {
  let component: UsersEntitiesLeadDepartementsComponent;
  let fixture: ComponentFixture<UsersEntitiesLeadDepartementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersEntitiesLeadDepartementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersEntitiesLeadDepartementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
