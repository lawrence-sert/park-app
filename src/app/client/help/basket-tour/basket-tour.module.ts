import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasketTourPageRoutingModule } from './basket-tour-routing.module';

import { BasketTourPage } from './basket-tour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasketTourPageRoutingModule
  ],
  declarations: [BasketTourPage]
})
export class BasketTourPageModule {}
