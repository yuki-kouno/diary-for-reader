import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './shell/shell.component';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { SheredModule } from '../shered/shered.module';

@NgModule({
  declarations: [ShellComponent, BottomNavComponent],
  imports: [CommonModule, ShellRoutingModule, MatIconModule, SheredModule],
  entryComponents: [BottomNavComponent],
  bootstrap: [ShellComponent],
})
export class ShellModule {}
