import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasketItemEditPageRoutingModule } from './basket-item-edit-routing.module';

import { BasketItemEditPage } from './basket-item-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasketItemEditPageRoutingModule
  ],
  declarations: [BasketItemEditPage]
})
export class BasketItemEditPageModule {}
