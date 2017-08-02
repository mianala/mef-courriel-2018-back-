import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSidenavProfilComponent } from './user-sidenav-profil.component';

describe('UserSidenavProfilComponent', () => {
  let component: UserSidenavProfilComponent;
  let fixture: ComponentFixture<UserSidenavProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSidenavProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSidenavProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
