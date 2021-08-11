import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CookiePageRoutingModule } from './cookie-routing.module';

import { CookiePage } from './cookie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CookiePageRoutingModule
  ],
  declarations: [CookiePage]
})
export class CookiePageModule {}
