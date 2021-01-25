import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReviewListComponent } from './all-review-list.component';

describe('AllReviewListComponent', () => {
  let component: AllReviewListComponent;
  let fixture: ComponentFixture<AllReviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllReviewListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
