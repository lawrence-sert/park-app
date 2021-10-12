import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { UserService } from 'src/app/auth/services/user.service';

export interface imageData{
	fileName: string;
	filePath: string;
	size: string;
}

@Component({
	selector: 'app-image-up',
	templateUrl: './image-up.page.html',
	styleUrls: ['./image-up.page.scss'],
})
export class ImageUpPage implements OnInit {

	uid: any;
	crrntUsr: any;
	userRef: any;
	photoUrl: any;

	fileName: string;
	fileSize: string;
	isLoading: boolean;
	isLoaded: boolean;
	private imageCollection: AngularFirestoreCollection<imageData>;
	imagefile: Observable<imageData[]>;
	imageUpload: AngularFireUploadTask;
	percentage: Observable<number>;
	snapshot: Observable<any>;
	FileImageUPload: Observable<any>;
	UserUID: AngularFirestoreDocument;

	picture:string;

	constructor(
		private database: AngularFirestore,
		private storage: AngularFireStorage,
		private router: Router,
		private loading: LoadingController,
		private userService: UserService,
		private modalCtr: ModalController
		) { }

	ngOnInit() {
		this.isLoading = false;
		this.isLoaded = false;
		this.imageCollection = this.database.collection<imageData>('loginUploads');
		this.imagefile = this.imageCollection.valueChanges();

		this.crrntUsr = JSON.parse(window.localStorage.getItem('user'));
		const id = this.crrntUsr.uid;
		this.userService.getUserDoc(id).subscribe(res => {
			this.userRef = res;
			this.photoUrl = this.userRef.photoUrl;
		});
	}

	async uploadImagetoFirebase(event){

		this.crrntUsr = JSON.parse(window.localStorage.getItem('user'));
		const id = this.crrntUsr.uid;

		const load = await this.loading.create({
			spinner:'dots',
		})
				load.present();

		const file = event.target.files;
		console.log(file);
		var fileName = file[0];
		console.log(fileName);

		if(fileName.type.split('/')[0] !=="image" ){
			console.error("File is not an Image");
			return;
		}

		this.isLoading = true;
		this.isLoaded = false;

		const path =  `loginUploads/${new Date().getTime()}_${fileName.name}`;

		var fileRef = this.storage.ref(path);

		this.imageUpload = this.storage.upload(path,fileName);
		this.loading.dismiss();

		this.percentage = this.imageUpload.percentageChanges();

		this.imageUpload.then( res=>{
			var imagefile = res.task.snapshot.ref.getDownloadURL();
			imagefile.then( downloadableUrl=>{
				console.log("URL", downloadableUrl);
				this.database.doc(`users/${id}`).update({
					photoUrl: downloadableUrl
				});
			})
		})
	}


	goToNextPage(){
		this.modalCtr.dismiss({
			'dismissed': true
		});
	}

	closeModal() {
		this.modalCtr.dismiss({
			'dismissed': true
		});
	}

	async takePicture() {
		const image = await Camera.getPhoto({
			quality:100,
			allowEditing : true,
			resultType :CameraResultType.DataUrl,
		});

		this.picture = image.dataUrl;
	}

}
