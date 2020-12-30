import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { SettingsBottomSheetComponent } from './settings-bottom-sheet/settings-bottom-sheet.component';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsBottomSheetComponent,
    DeleteUserDialogComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatBottomSheetModule,
    MatDividerModule,
    RouterModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    SettingsComponent,
    SettingsBottomSheetComponent,
    DeleteUserDialogComponent,
  ],
})
export class SheredModule {}
