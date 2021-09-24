import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyBasketPage } from './buy-basket.page';

const routes: Routes = [
  {
    path: '',
    component: BuyBasketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyBasketPageRoutingModule {}
