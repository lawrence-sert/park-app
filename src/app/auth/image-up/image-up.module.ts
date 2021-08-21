import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageUpPageRoutingModule } from './image-up-routing.module';

import { ImageUpPage } from './image-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageUpPageRoutingModule
  ],
  declarations: [ImageUpPage]
})
export class ImageUpPageModule {}
