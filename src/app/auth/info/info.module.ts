import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoPageRoutingModule } from './info-routing.module';

import { ImageUpPageModule } from 'src/app/auth/image-up/image-up.module';

import { InfoPage } from './info.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    InfoPageRoutingModule,
    ImageUpPageModule
  ],
  declarations: [InfoPage]
})
export class InfoPageModule {}
