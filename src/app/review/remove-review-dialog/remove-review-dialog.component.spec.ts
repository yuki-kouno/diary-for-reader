import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveReviewDialogComponent } from './remove-review-dialog.component';

describe('RemoveReviewDialogComponent', () => {
  let component: RemoveReviewDialogComponent;
  let fixture: ComponentFixture<RemoveReviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveReviewDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
