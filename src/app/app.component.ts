import { Component } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  uid: any;
  crrntUsr: any;
  userRef: any;
  userEmail: any;
  firstname: any;
  lastname: any;
  displayName: any;
  email: any;
  emailVerified?: boolean;
  photourl: any;
  accountType?: any;
  firstrun : any;


  constructor(
    private authService: AuthService,
    public usersService: UserService,
    ) {

  }

  ngOnInit() {

    

  }
}
