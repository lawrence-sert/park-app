import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostcatPage } from './postcat.page';

const routes: Routes = [
  {
    path: '',
    component: PostcatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostcatPageRoutingModule {}
