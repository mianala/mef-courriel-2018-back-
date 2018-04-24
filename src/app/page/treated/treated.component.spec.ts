import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatedComponent } from './treated.component';

describe('TreatedComponent', () => {
  let component: TreatedComponent;
  let fixture: ComponentFixture<TreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
