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
  photoURL: any;
  accountType?: number;
  firstrun : any;

  photourl : any = 'assets/img/director2.png';

  constructor(
    private authService: AuthService,
    public usersService: UserService,
    ) {}

  ngOnInit() {

    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    this.userEmail = this.crrntUsr.email;
    this.usersService.getUserDoc(id).subscribe(res => {
      this.userRef = res;
      console.log(this.userRef);
    });

  }
}
