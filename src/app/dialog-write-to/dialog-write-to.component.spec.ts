import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWriteToComponent } from './dialog-write-to.component';

describe('DialogWriteToComponent', () => {
  let component: DialogWriteToComponent;
  let fixture: ComponentFixture<DialogWriteToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogWriteToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogWriteToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
