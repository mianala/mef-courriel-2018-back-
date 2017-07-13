import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedEmailComponent } from './saved-email.component';

describe('SavedEmailComponent', () => {
  let component: SavedEmailComponent;
  let fixture: ComponentFixture<SavedEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
