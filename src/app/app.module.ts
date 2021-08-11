import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//ngx addons
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';

//firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';

import { AuthService } from "src/app/services/auth.service";

import { UserMenuComponent } from 'src/app/components/user-menu/user-menu.component';


@NgModule({
	declarations: [AppComponent, UserMenuComponent],
	entryComponents: [],
	imports: [
		BrowserModule, 
		IonicModule.forRoot(), 
		AppRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule, // required animations module
		ToastrModule.forRoot(), // ToastrModule added
		NgxPaginationModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireDatabaseModule,
		AngularFireAuthModule,

	],
	providers: [
		AuthService,
	{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
