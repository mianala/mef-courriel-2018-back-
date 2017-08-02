import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsPageComponent } from './emails-page.component';

describe('EmailsPageComponent', () => {
  let component: EmailsPageComponent;
  let fixture: ComponentFixture<EmailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
