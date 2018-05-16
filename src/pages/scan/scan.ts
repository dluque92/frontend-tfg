import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, LoadingController, Loading, IonicPage, AlertController } from 'ionic-angular';
import { ApiConnectionProvider } from '../../providers/api-connection/api-connection';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ResultSearchPage } from '../result-search/result-search';

/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  loader : Loading;
  country : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiConnection: ApiConnectionProvider, 
    private scanner: BarcodeScanner, public modalCtrl: ModalController, public loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
      this.country = this.navParams.get('country');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }

  openBarcodeScanner(){
    this.scanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.showLoading();
      this.getData(this.country, barcodeData.text);
     }).catch(err => {
         console.log('Error', err);
     });
  }

  public async getData(country, values){
    try{
      const [result, error] = await this.apiConnection.send(country, values);
      if(error){
        console.log("ERROR HERE");
        console.log(error);
      }else if(result){
        console.log(result);
        this.hideLoading();
        let name = result['results'].name;
        let image = result['results'].imageUrl;
        let description = result['results'].description;
        let items = result['results'].offers;
        this.openResult(name, image, description, items);
      }
    }catch (error){
      console.log("ERROR: ", error);
    }
  }

  showLoading() {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`
   });
   this.loader.present();
 }

 hideLoading(){
   this.loader.dismiss();
 }

  openResult(name, image, description, items) {
    this.navCtrl.push(ResultSearchPage, {'name': name, 'items': items, 'image': image, 'description': description});
    //let modal = this.modalCtrl.create(ResultSearchPage, {'name': name, 'items': items, 'image': image, 'description': description});
    //modal.onDidDismiss(() => { })
    //modal.present();
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
            this.showLoading();
            this.getData(this.country, data.Barcode);
          }
        }
      ]
    });
    alert.present();
  }

}
