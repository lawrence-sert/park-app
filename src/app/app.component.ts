import { Component } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    public usersService: UserService,
    ) {
    
  }
  ngOnInit() {
  }
}
