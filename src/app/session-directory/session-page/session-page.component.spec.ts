import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionPageComponent } from './session-page.component';

describe('SessionPageComponent', () => {
  let component: SessionPageComponent;
  let fixture: ComponentFixture<SessionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
