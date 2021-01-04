import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './shell/shell.component';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { SheredModule } from '../shered/shered.module';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ShellComponent, BottomNavComponent, SideNavComponent],
  imports: [
    CommonModule,
    ShellRoutingModule,
    MatIconModule,
    SheredModule,
    MatButtonModule,
  ],
  entryComponents: [BottomNavComponent],
  bootstrap: [ShellComponent],
})
export class ShellModule {}
