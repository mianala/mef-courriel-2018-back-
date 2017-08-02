import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionFileComponent } from './session-file.component';

describe('SessionFileComponent', () => {
  let component: SessionFileComponent;
  let fixture: ComponentFixture<SessionFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
