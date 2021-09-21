import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Accounts } from 'src/app/client/models/accounts.model';
import { Router } from "@angular/router";
import { UserService } from 'src/app/auth/services/user.service';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';


import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor() { }


  makePayment(data){

  }

}
