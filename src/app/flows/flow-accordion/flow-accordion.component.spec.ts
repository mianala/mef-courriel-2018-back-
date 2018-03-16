import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowAccordionComponent } from './flow-accordion.component';

describe('FlowAccordionComponent', () => {
  let component: FlowAccordionComponent;
  let fixture: ComponentFixture<FlowAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
