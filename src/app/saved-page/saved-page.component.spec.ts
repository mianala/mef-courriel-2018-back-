import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPageComponent } from './saved-page.component';

describe('SavedPageComponent', () => {
  let component: SavedPageComponent;
  let fixture: ComponentFixture<SavedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
