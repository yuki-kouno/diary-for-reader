import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMenuComponent } from './question-menu.component';

describe('QuestionMenuComponent', () => {
  let component: QuestionMenuComponent;
  let fixture: ComponentFixture<QuestionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
