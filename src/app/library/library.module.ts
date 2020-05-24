import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library/library.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { RemoveDialogComponent } from './remove-dialog/remove-dialog.component';

@NgModule({
  declarations: [LibraryComponent, RemoveDialogComponent],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
  ],
})
export class LibraryModule {}
