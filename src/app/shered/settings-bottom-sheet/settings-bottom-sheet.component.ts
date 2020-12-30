import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-settings-bottom-sheet',
  templateUrl: './settings-bottom-sheet.component.html',
  styleUrls: ['./settings-bottom-sheet.component.scss'],
})
export class SettingsBottomSheetComponent implements OnInit {
  constructor(
    private bottomSheet: MatBottomSheet,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  closeBotttomSheet() {
    this.bottomSheet.dismiss();
  }
  logout() {
    this.authService.logout();
  }
  openDialog() {
    this.dialog.open(DeleteUserDialogComponent);
  }
  ngOnInit(): void {}
}
