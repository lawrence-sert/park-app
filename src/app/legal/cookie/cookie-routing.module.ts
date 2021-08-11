import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CookiePage } from './cookie.page';

const routes: Routes = [
  {
    path: '',
    component: CookiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CookiePageRoutingModule {}
