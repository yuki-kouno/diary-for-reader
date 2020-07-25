import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import 'firebase/firestore';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/functions';
import { registerLocaleData, DatePipe } from '@angular/common';
import localeJa from '@angular/common/locales/ja';
registerLocaleData(localeJa);
import { FullCalendarModule } from '@fullcalendar/angular';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatSnackBarModule,
    AngularFireFunctionsModule,
  ],
  providers: [
    { provide: REGION, useValue: 'asia-northeast1' },
    { provide: LOCALE_ID, useValue: 'ja-JP' },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
