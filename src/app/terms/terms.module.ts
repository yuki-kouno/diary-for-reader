import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsRoutingModule } from './terms-routing.module';
import { TermsServiceComponent } from './terms-service/terms-service.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';

@NgModule({
  declarations: [TermsServiceComponent, PrivacypolicyComponent],
  imports: [CommonModule, TermsRoutingModule],
})
export class TermsModule {}
