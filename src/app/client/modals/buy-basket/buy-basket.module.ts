import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyBasketPageRoutingModule } from './buy-basket-routing.module';

import { BuyBasketPage } from './buy-basket.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    BuyBasketPageRoutingModule
  ],
  declarations: [BuyBasketPage]
})
export class BuyBasketPageModule {}
