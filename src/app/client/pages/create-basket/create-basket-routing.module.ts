import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateBasketPage } from './create-basket.page';

const routes: Routes = [
  {
    path: '',
    component: CreateBasketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateBasketPageRoutingModule {}
