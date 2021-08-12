import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {

	uid: any;
	crrntUsr: any;
	userRef: any;
	userEmail: any;
	firstname: any;
	lastname: any;
	displayName: any;
	email: any;
	emailVerified?: boolean;
	photoURL: any;
	accountType?: any;
	firstrun : any;
	phone : any;

  constructor(
		private usersService: UserService
		) { 
		// Local storage information
		this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
		const id = this.crrntUsr.uid;
		this.usersService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.firstname = this.userRef.firstname;
			this.lastname = this.userRef.surname;
			this.displayName = this.userRef.displayName;
			this.emailVerified = this.userRef.emailVerified;
			this.accountType = this.userRef.accountType;
			this.photoURL = this.userRef.photoURL;
		});
	}

	ngOnInit() {}

}
