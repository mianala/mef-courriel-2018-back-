import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedEmailsPageComponent } from './saved-emails-page.component';

describe('SavedEmailsPageComponent', () => {
  let component: SavedEmailsPageComponent;
  let fixture: ComponentFixture<SavedEmailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedEmailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedEmailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
