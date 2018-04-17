import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSaveProjectComponent } from './dialog-save-project.component';

describe('DialogSaveProjectComponent', () => {
  let component: DialogSaveProjectComponent;
  let fixture: ComponentFixture<DialogSaveProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSaveProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSaveProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
