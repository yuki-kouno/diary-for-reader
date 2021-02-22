import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { HeaderComponent } from './header/header.component';
import { AutofocusDirective } from './autofocus.directive';
import { RankingComponent } from './ranking/ranking.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    SettingsBottomSheetComponent,
    DeleteUserDialogComponent,
    HeaderComponent,
    AutofocusDirective,
    RankingComponent,
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
    SwiperModule,
  ],
  exports: [
    SettingsBottomSheetComponent,
    DeleteUserDialogComponent,
    HeaderComponent,
    AutofocusDirective,
    RankingComponent,
  ],
})
export class SheredModule {}
