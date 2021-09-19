import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { VideosService } from 'src/app/client/services/videos.service';
import { Videos } from 'src/app/client/models/videos.model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-watch',
	templateUrl: './watch.component.html',
	styleUrls: ['./watch.component.scss'],
})
export class WatchComponent implements OnInit {

	type: string;

	crrntUsr: any;
	userRef: any;

	constructor(
		private videosService: VideosService,
		public db: AngularFirestore,
		) { }

	ngOnInit() {

		this.type = 'breakfast';

		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;

	}

	segmentChanged(ev: any) {
		console.log('Segment changed', ev);
	}

}
