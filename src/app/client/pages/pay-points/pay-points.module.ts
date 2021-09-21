import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayPointsPageRoutingModule } from './pay-points-routing.module';

import { PayPointsPage } from './pay-points.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    PayPointsPageRoutingModule
  ],
  declarations: [PayPointsPage]
})
export class PayPointsPageModule {}
