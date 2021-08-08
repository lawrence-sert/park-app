import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateBasketPageRoutingModule } from './create-basket-routing.module';

import { CreateBasketPage } from './create-basket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateBasketPageRoutingModule
  ],
  declarations: [CreateBasketPage]
})
export class CreateBasketPageModule {}
