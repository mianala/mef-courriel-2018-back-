import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedPageComponent } from './returned-page.component';

describe('ReturnedPageComponent', () => {
  let component: ReturnedPageComponent;
  let fixture: ComponentFixture<ReturnedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
