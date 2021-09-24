import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasketPageRoutingModule } from './basket-routing.module';

import { AddBasketPageModule } from 'src/app/client/modals/add-basket/add-basket.module';

import { BuyBasketPageModule } from 'src/app/client/modals/buy-basket/buy-basket.module';

import { BasketPage } from './basket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasketPageRoutingModule,
    AddBasketPageModule,
    BuyBasketPageModule
  ],
  declarations: [BasketPage]
})
export class BasketPageModule {}
