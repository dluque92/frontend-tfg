import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, IonicPage, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ScanPage } from '../scan/scan';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  country : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private scanner: BarcodeScanner, private alertCtrl: AlertController) {
      this.country = this.navParams.get('country');
  }

  openBarcodeScanner(){
    this.scanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if(barcodeData.text){
        this.navCtrl.push(ScanPage, {'barcode': barcodeData.text});
      }
    }).catch(err => {
        console.log('Error', err);
    });
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Write your barcode',
      inputs: [
        {
          name: 'Barcode',
          placeholder: 'Barcode',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Scan',
          handler: data => {
            console.log('Barcode data', data);
            this.navCtrl.push(ScanPage, {'barcode': data.Barcode});
          }
        }
      ]
    });
    alert.present();
  }

}
