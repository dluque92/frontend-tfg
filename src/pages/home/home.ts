import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ApiConnectionProvider } from '../../providers/api-connection/api-connection';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ResultSearchPage } from '../result-search/result-search';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController, public apiConnection: ApiConnectionProvider, 
    private scanner: BarcodeScanner, public modalCtrl: ModalController, private spinnerDialog: SpinnerDialog) {
      
  }

  openBarcodeScanner(){
    this.scanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.spinnerDialog.show();
      this.getData('es',barcodeData.text);
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
        this.spinnerDialog.hide();
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

  openResult(name, image, description, items) {
    this.navCtrl.push(ResultSearchPage, {'name': name, 'items': items, 'image': image, 'description': description});
    //let modal = this.modalCtrl.create(ResultSearchPage, {'name': name, 'items': items, 'image': image, 'description': description});
    //modal.onDidDismiss(() => { })
    //modal.present();
  }

}
