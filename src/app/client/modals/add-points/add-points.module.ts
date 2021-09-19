import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPointsPageRoutingModule } from './add-points-routing.module';

import { AddPointsPage } from './add-points.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPointsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddPointsPage]
})
export class AddPointsPageModule {}
