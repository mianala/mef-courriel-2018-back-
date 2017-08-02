import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEntitiesDepartementsComponent } from './users-entities-departements.component';

describe('UsersEntitiesDepartementsComponent', () => {
  let component: UsersEntitiesDepartementsComponent;
  let fixture: ComponentFixture<UsersEntitiesDepartementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersEntitiesDepartementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersEntitiesDepartementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
