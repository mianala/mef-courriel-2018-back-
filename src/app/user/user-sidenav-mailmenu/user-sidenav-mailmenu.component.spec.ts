import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSidenavMailmenuComponent } from './user-sidenav-mailmenu.component';

describe('UserSidenavMailmenuComponent', () => {
  let component: UserSidenavMailmenuComponent;
  let fixture: ComponentFixture<UserSidenavMailmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSidenavMailmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSidenavMailmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
