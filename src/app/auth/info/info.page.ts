import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

import { ModalController } from '@ionic/angular';
import { AuthService } from "src/app/services/auth.service";
import User from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import auth  from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';

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
  	public photoService: PhotoService,
    private modalCtrl : ModalController,
    private authService: AuthService,
    private userService: UserService,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    private toastr: ToastrService,
    public formBuilder: FormBuilder,
  	) { 
    this.editForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      phone: [''],
      accountType: [''],
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
    this.firstrun = this.userRef.firstrun;

    console.log(this.userRef);
    });
  }

  addPhotoToGallery() {
  this.photoService.addNewToGallery();
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

  onSubmit() {
    this.crrntUsr = JSON.parse(window.localStorage.getItem("user"));
    const id = this.crrntUsr.uid;
    this.userService.updateUser(this.editForm.value, id);
    this.toastr.success('Your profile information has been successfully updated', 'Success');
    this.router.navigate(['/dashboard']);  
  }

  

}
