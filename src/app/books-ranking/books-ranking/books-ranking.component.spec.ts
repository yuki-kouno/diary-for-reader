import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksRankingComponent } from './books-ranking.component';

describe('BooksRankingComponent', () => {
  let component: BooksRankingComponent;
  let fixture: ComponentFixture<BooksRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BooksRankingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
