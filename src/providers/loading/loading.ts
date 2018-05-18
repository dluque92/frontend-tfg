import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingProvider {

  loading: Loading;

  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello LoadingProvider Provider');
  }

  presentWithGif() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="custom-spinner-container">
        <img class="loading" width="200px" height="200px" src="./assets/imgs/wedges-3s-200px.svg" />
      </div>`
    });

    return this.loading.present();
  }

  dismiss() {
    return new Promise((resolve, reject) => {
      if (this.loading) {
        return this.loading.dismiss(resolve(true)).catch(error => {
          console.log('loading error: ', error);
        });
      } else {
        resolve(true);
      }
    });
  }

}
