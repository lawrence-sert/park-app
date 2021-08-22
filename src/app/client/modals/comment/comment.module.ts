import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentPageRoutingModule } from './comment-routing.module';

import { CommentPage } from './comment.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    CommentPageRoutingModule
  ],
  declarations: [CommentPage]
})
export class CommentPageModule {}
