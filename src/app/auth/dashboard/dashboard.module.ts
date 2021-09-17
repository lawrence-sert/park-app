import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';

import { ImageUpPageModule } from 'src/app/auth/image-up/image-up.module';

import { RecipesComponent } from 'src/app/client/components/recipes/recipes.component';
import { MapsComponent } from 'src/app/client/components/maps/maps.component';
import { DashComponent } from 'src/app/client/components/dash/dash.component';
import { ListComponent } from 'src/app/client/components/list/list.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		DashboardPageRoutingModule,
		ImageUpPageModule
	],
	declarations: [
		DashboardPage,  
		RecipesComponent,
		MapsComponent,
		ListComponent,
		DashComponent
	]
})
export class DashboardPageModule {}
