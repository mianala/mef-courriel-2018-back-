import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowAccordionItemComponent } from './flow-accordion-item.component';

describe('FlowAccordionItemComponent', () => {
  let component: FlowAccordionItemComponent;
  let fixture: ComponentFixture<FlowAccordionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowAccordionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowAccordionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
