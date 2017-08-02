import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWriteEmailComponent } from './dialog-write-email.component';

describe('DialogWriteEmailComponent', () => {
  let component: DialogWriteEmailComponent;
  let fixture: ComponentFixture<DialogWriteEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogWriteEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogWriteEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
