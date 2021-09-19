import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { CombosService } from 'src/app/client/services/combos.service';
import { Combos } from 'src/app/client/models/combos.model';


@Component({
	selector: 'app-combo',
	templateUrl: './combo.component.html',
	styleUrls: ['./combo.component.scss'],
})
export class ComboComponent implements OnInit {

	combos: any;

	constructor(
		private db: AngularFirestore,
		private combosService: CombosService
		) { }

	ngOnInit() {

		//read Posts
		this.combosService.getCombos().subscribe((data) => {
			this.combos = data.map((e)=>{
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Combos;
			});
		});
	}

}
