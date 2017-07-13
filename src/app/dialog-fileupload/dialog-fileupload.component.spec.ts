import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFileuploadComponent } from './dialog-fileupload.component';

describe('DialogFileuploadComponent', () => {
  let component: DialogFileuploadComponent;
  let fixture: ComponentFixture<DialogFileuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFileuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFileuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
