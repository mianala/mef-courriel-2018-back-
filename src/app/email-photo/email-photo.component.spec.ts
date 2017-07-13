import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPhotoComponent } from './email-photo.component';

describe('EmailPhotoComponent', () => {
  let component: EmailPhotoComponent;
  let fixture: ComponentFixture<EmailPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
