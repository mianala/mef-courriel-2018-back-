import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionMembersUserComponent } from './session-members-user.component';

describe('SessionMembersUserComponent', () => {
  let component: SessionMembersUserComponent;
  let fixture: ComponentFixture<SessionMembersUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionMembersUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionMembersUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
