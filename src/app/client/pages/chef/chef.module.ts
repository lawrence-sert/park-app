import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChefPageRoutingModule } from './chef-routing.module';

import { ChefPage } from './chef.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChefPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ChefPage]
})
export class ChefPageModule {}
