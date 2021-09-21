import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayPointsPage } from './pay-points.page';

const routes: Routes = [
  {
    path: '',
    component: PayPointsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayPointsPageRoutingModule {}
