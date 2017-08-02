import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionMessageboxComponent } from './session-messagebox.component';

describe('SessionMessageboxComponent', () => {
  let component: SessionMessageboxComponent;
  let fixture: ComponentFixture<SessionMessageboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionMessageboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionMessageboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
