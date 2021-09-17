import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class IonLoaderService {

  constructor(public loadingController: LoadingController) { } 

  // Custom style + hide on tap loader
  customLoader() {
    this.loadingController.create({
      message: '',
      duration: 3000,
      cssClass:'loader-css-class',
      backdropDismiss:true
    }).then((res) => {
      res.present();
    });
  }   

}