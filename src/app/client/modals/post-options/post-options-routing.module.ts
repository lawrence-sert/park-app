import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostOptionsPage } from './post-options.page';

const routes: Routes = [
  {
    path: '',
    component: PostOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostOptionsPageRoutingModule {}
