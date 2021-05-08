import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { FaqComponent } from './faq/faq.component';

@NgModule({
  declarations: [FaqComponent],
  imports: [CommonModule, HelpRoutingModule],
})
export class HelpModule {}
