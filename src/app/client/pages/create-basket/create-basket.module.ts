import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateBasketPageRoutingModule } from './create-basket-routing.module';

import { CreateBasketPage } from './create-basket.page';

import { ImageUpPageModule } from 'src/app/auth/image-up/image-up.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateBasketPageRoutingModule,
    ImageUpPageModule
  ],
  declarations: [CreateBasketPage]
})
export class CreateBasketPageModule {}
