import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostcatPageRoutingModule } from './postcat-routing.module';

import { PostcatPage } from './postcat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostcatPageRoutingModule
  ],
  declarations: [PostcatPage]
})
export class PostcatPageModule {}
