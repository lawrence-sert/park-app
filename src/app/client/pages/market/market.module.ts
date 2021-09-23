import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarketPageRoutingModule } from './market-routing.module';

import { MarketPage } from './market.page';

import { ImageUpPageModule } from 'src/app/auth/image-up/image-up.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarketPageRoutingModule,
    ImageUpPageModule
  ],
  declarations: [MarketPage]
})
export class MarketPageModule {}
