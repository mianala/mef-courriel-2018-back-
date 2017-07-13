import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRouterComponent } from './email-router.component';

describe('EmailRouterComponent', () => {
  let component: EmailRouterComponent;
  let fixture: ComponentFixture<EmailRouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailRouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
