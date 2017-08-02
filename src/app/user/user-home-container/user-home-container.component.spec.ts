import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeContainerComponent } from './user-home-container.component';

describe('UserHomeContainerComponent', () => {
  let component: UserHomeContainerComponent;
  let fixture: ComponentFixture<UserHomeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHomeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHomeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
