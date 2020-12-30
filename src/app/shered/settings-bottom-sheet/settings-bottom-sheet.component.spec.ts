import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsBottomSheetComponent } from './settings-bottom-sheet.component';

describe('SettingsBottomSheetComponent', () => {
  let component: SettingsBottomSheetComponent;
  let fixture: ComponentFixture<SettingsBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsBottomSheetComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
