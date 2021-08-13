import { Component, OnInit } from '@angular/core';
import { LocalNotificationService } from "src/app/services/local-notification.service";

@Component({
	selector: 'app-dash',
	templateUrl: './dash.component.html',
	styleUrls: ['./dash.component.scss'],
})
export class DashComponent implements OnInit {

	constructor(
		private localNotification : LocalNotificationService
		) { }

	ngOnInit() {}

	sendLocalNotification () {
		this.localNotification.showLocalNotification (  
			1, 
			"title", 
			"TEST NOTIFICATION"
			);
	}

}
