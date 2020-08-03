import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarySearchResultsComponent } from './library-search-results.component';

describe('LibrarySearchResultsComponent', () => {
  let component: LibrarySearchResultsComponent;
  let fixture: ComponentFixture<LibrarySearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LibrarySearchResultsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarySearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
