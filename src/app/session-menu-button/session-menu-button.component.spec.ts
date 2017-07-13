import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionMenuButtonComponent } from './session-menu-button.component';

describe('SessionMenuButtonComponent', () => {
  let component: SessionMenuButtonComponent;
  let fixture: ComponentFixture<SessionMenuButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionMenuButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
