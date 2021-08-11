import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { HomeComponent } from 'src/app/client/home/home.component';
import { MessagingComponent } from 'src/app/components/messaging/messaging.component';
import { RecipesComponent } from 'src/app/components/recipes/recipes.component';
import { MapsComponent } from 'src/app/components/maps/maps.component';
import { DashComponent } from 'src/app/components/dash/dash.component';
import { ListComponent } from 'src/app/components/list/list.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		DashboardPageRoutingModule
	],
	declarations: [
		DashboardPage, 
		HomeComponent, 
		MessagingComponent,
		RecipesComponent,
		MapsComponent,
		ListComponent,
		DashComponent
	]
})
export class DashboardPageModule {}
