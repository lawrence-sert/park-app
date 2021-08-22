import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipePageRoutingModule } from './recipe-routing.module';

import { CommentPageModule } from 'src/app/client/modals/comment/comment.module';

import { RecipePage } from './recipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipePageRoutingModule,
    CommentPageModule
  ],
  declarations: [RecipePage]
})
export class RecipePageModule {}
