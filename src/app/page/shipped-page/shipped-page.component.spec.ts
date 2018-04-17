import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippedPageComponent } from './shipped-page.component';

describe('ShippedPageComponent', () => {
  let component: ShippedPageComponent;
  let fixture: ComponentFixture<ShippedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
