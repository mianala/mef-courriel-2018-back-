import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatedProjectComponent } from './treated-project.component';

describe('TreatedProjectComponent', () => {
  let component: TreatedProjectComponent;
  let fixture: ComponentFixture<TreatedProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatedProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatedProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
