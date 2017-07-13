import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMenuButtonComponent } from './email-menu-button.component';

describe('EmailMenuButtonComponent', () => {
  let component: EmailMenuButtonComponent;
  let fixture: ComponentFixture<EmailMenuButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailMenuButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
