import { Component } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  // public appPages = [
  //   { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
  //   { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
  //   { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
  //   { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
  //   { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
  //   { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  // ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

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
      this.userEmail = this.userRef.email;
      this.firstrun = this.userRef.firstrun;
      this.firstname = this.userRef.firstname;
      this.lastname = this.userRef.surname;
      this.displayName = this.userRef.displayName;
      this.emailVerified = this.userRef.emailVerified;
      this.photoURL = this.userRef.photoURL;
      this.accountType = this.userRef.accountType;

      console.log(this.accountType);
    });

  }
}
