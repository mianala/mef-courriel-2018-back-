import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSidenavTimeComponent } from './user-sidenav-time.component';

describe('UserSidenavTimeComponent', () => {
  let component: UserSidenavTimeComponent;
  let fixture: ComponentFixture<UserSidenavTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSidenavTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSidenavTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
