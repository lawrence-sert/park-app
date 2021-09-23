import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasketItemEditPage } from './basket-item-edit.page';

const routes: Routes = [
  {
    path: '',
    component: BasketItemEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasketItemEditPageRoutingModule {}
