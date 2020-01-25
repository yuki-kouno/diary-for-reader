import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChoiceBookComponent } from './dialog-choice-book.component';

describe('DialogChoiceBookComponent', () => {
  let component: DialogChoiceBookComponent;
  let fixture: ComponentFixture<DialogChoiceBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogChoiceBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChoiceBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
