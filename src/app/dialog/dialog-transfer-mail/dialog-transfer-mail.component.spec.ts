import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTransferMailComponent } from './dialog-transfer-mail.component';

describe('DialogTransferMailComponent', () => {
  let component: DialogTransferMailComponent;
  let fixture: ComponentFixture<DialogTransferMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTransferMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTransferMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
