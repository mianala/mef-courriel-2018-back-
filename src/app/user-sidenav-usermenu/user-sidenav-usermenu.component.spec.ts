import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSidenavUsermenuComponent } from './user-sidenav-usermenu.component';

describe('UserSidenavUsermenuComponent', () => {
  let component: UserSidenavUsermenuComponent;
  let fixture: ComponentFixture<UserSidenavUsermenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSidenavUsermenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSidenavUsermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
