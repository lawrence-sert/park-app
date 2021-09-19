import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPointsPage } from './add-points.page';

const routes: Routes = [
  {
    path: '',
    component: AddPointsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPointsPageRoutingModule {}
