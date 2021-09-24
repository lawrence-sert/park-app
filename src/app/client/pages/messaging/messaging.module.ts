import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagingPageRoutingModule } from './messaging-routing.module';

import { MessagingPage } from './messaging.page';

import { ImageUpPageModule } from 'src/app/auth/image-up/image-up.module';
import { FaqPageModule } from 'src/app/client/modals/faq/faq.module';
import { TutorialPageModule } from 'src/app/client/modals/tutorial/tutorial.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MessagingPageRoutingModule,
    ImageUpPageModule,
    FaqPageModule,
    TutorialPageModule
  ],
  declarations: [MessagingPage]
})
export class MessagingPageModule {}
