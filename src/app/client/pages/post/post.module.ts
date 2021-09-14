import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostPageRoutingModule } from './post-routing.module';

import { PostPage } from './post.page';

import { PostOptionsPageModule } from 'src/app/client/modals/post-options/post-options.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostPageRoutingModule,
    PostOptionsPageModule
  ],
  declarations: [PostPage]
})
export class PostPageModule {}
