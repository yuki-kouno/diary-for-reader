import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsServiceComponent } from './terms-service/terms-service.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';

const routes: Routes = [
  {
    path: 'privacypolicy',
    component: PrivacypolicyComponent,
  },
  {
    path: 'termsService',
    component: TermsServiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsRoutingModule {}
