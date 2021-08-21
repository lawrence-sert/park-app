import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from "src/app/auth/services/auth.service";
import User from 'src/app/auth/models/user.model';
import { UserService } from 'src/app/auth/services/user.service';
import auth  from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import {  MenuController } from '@ionic/angular';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';

import { ImageUpPage } from 'src/app/auth/image-up/image-up.page';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  public editForm: FormGroup;

  uid: any;

  displayName: any;
  email: any;
  photoURL: any;
  emailVerified : any;
  firstrun : any;
  crrntUsr : any;
  userEmail : any;
  userRef : any;


  constructor(
    private modalCtrl : ModalController,
    public authService: AuthService,
    private userService: UserService,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    private toastr: ToastrService,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController
  	) { 
    this.editForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      phone: [''],
      accountType: [''],
      location: [''],
    })

  }

  ngOnInit() {
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;

    this.userEmail = this.crrntUsr.email;

    this.userService.getUserDoc(id).subscribe(res => {
    this.userRef = res;
    this.firstname.patchValue(res.firstname.split(' ')[0])
    this.lastname.patchValue(res.lastname.split(' ')[0])
    this.accountType.patchValue(res.accountType);
    this.location.patchValue(res.location);
    this.firstrun = this.userRef.firstrun;

    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }



// Form Getters
   get firstname(){
    return this.editForm.get('firstname')
  }
  get lastname(){
    return this.editForm.get('lastname')
  }
  get phone(){
    return this.editForm.get('phone')
  }
  get accountType(){
    return this.editForm.get('accountType')
  }
  get location(){
    return this.editForm.get('location')
  }

  onSubmit() {
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    this.userService.updateUser(this.editForm.value, id);
    this.router.navigate(['/dashboard']);  
  }

async openCalModal() {
  const modal = await this.modalCtrl.create({
    component: ImageUpPage,
    cssClass: 'app-image-up',
    backdropDismiss: false
  });
 
  await modal.present();
 
}

  

}
