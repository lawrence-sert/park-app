import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagingPageRoutingModule } from './messaging-routing.module';

import { MessagingPage } from './messaging.page';

import { ImageUpPageModule } from 'src/app/auth/image-up/image-up.module';

import { FaqPageModule } from 'src/app/client/modals/faq/faq.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MessagingPageRoutingModule,
    ImageUpPageModule
  ],
  declarations: [MessagingPage]
})
export class MessagingPageModule {}
