import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSaveMailComponent } from './dialog-save-mail.component';

describe('DialogSaveMailComponent', () => {
  let component: DialogSaveMailComponent;
  let fixture: ComponentFixture<DialogSaveMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSaveMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSaveMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
