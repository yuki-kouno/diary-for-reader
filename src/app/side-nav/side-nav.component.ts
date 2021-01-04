import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SettingsBottomSheetComponent } from '../shered/settings-bottom-sheet/settings-bottom-sheet.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  constructor(private bottomSheet: MatBottomSheet) {}

  openSheet() {
    this.bottomSheet.open(SettingsBottomSheetComponent, {
      panelClass: 'custom-side-nav',
    });
  }

  ngOnInit(): void {}
}
