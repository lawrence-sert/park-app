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
import { NgxPaginationModule } from 'ngx-pagination';

//firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';
import { AuthService } from "src/app/auth/services/auth.service";

//geo maps
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

//different user menus
import { UserMenuComponent } from 'src/app/client/components/user-menu/user-menu.component';
import { FarmerMenuComponent } from 'src/app/farmer/components/farmer-menu/farmer-menu.component';
import { VendorMenuComponent } from 'src/app/vendor/components/vendor-menu/vendor-menu.component';

@NgModule({
	declarations: [AppComponent, UserMenuComponent, FarmerMenuComponent, VendorMenuComponent],
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
	Geolocation,
	NativeGeocoder,
	{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
