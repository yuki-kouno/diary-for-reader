import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './shell/shell.component';
import { NavComponent } from '../services/nav/nav.component';

@NgModule({
  declarations: [ShellComponent, NavComponent],
  imports: [CommonModule, ShellRoutingModule],
  entryComponents: [NavComponent],
  bootstrap: [ShellComponent],
})
export class ShellModule {}