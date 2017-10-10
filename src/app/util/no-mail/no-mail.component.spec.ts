import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMailComponent } from './no-mail.component';

describe('NoMailComponent', () => {
  let component: NoMailComponent;
  let fixture: ComponentFixture<NoMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
