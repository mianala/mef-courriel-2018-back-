import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailFileComponent } from './email-file.component';

describe('EmailFileComponent', () => {
  let component: EmailFileComponent;
  let fixture: ComponentFixture<EmailFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
