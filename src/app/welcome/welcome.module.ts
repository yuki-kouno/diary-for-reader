import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    CreateDialogComponent,
    LoginDialogComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    WelcomeComponent,
    CreateDialogComponent,
    LoginDialogComponent
  ]
})
export class WelcomeModule {}
