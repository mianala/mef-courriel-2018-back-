import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchedPageComponent } from './dispatched-page.component';

describe('DispatchedPageComponent', () => {
  let component: DispatchedPageComponent;
  let fixture: ComponentFixture<DispatchedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
