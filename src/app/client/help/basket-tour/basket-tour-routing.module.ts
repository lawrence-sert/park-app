import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasketTourPage } from './basket-tour.page';

const routes: Routes = [
  {
    path: '',
    component: BasketTourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasketTourPageRoutingModule {}
