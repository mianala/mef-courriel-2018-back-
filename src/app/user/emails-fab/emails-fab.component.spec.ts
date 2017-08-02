import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsFabComponent } from './emails-fab.component';

describe('EmailsFabComponent', () => {
  let component: EmailsFabComponent;
  let fixture: ComponentFixture<EmailsFabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailsFabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
