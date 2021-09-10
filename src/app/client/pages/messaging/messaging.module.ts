import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagingPageRoutingModule } from './messaging-routing.module';

import { MessagingPage } from './messaging.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MessagingPageRoutingModule
  ],
  declarations: [MessagingPage]
})
export class MessagingPageModule {}
