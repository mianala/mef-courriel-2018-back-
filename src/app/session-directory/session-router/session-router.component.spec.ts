import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionRouterComponent } from './session-router.component';

describe('SessionRouterComponent', () => {
  let component: SessionRouterComponent;
  let fixture: ComponentFixture<SessionRouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionRouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
