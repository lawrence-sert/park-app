import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostOptionsPageRoutingModule } from './post-options-routing.module';

import { PostOptionsPage } from './post-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostOptionsPageRoutingModule
  ],
  declarations: [PostOptionsPage]
})
export class PostOptionsPageModule {}
