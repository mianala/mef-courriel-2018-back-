import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedEmailPageComponent } from './saved-email-page.component';

describe('SavedEmailPageComponent', () => {
  let component: SavedEmailPageComponent;
  let fixture: ComponentFixture<SavedEmailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedEmailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedEmailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
