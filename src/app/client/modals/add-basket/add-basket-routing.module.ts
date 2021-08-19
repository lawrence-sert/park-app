import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBasketPage } from './add-basket.page';

const routes: Routes = [
  {
    path: '',
    component: AddBasketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBasketPageRoutingModule {}
