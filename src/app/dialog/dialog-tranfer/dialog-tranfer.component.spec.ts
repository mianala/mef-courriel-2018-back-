import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTranferComponent } from './dialog-tranfer.component';

describe('DialogTranferComponent', () => {
  let component: DialogTranferComponent;
  let fixture: ComponentFixture<DialogTranferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTranferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTranferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
