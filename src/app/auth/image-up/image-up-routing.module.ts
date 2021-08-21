import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageUpPage } from './image-up.page';

const routes: Routes = [
  {
    path: '',
    component: ImageUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageUpPageRoutingModule {}
