import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiConnectionProvider } from '../../providers/api-connection/api-connection';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

let name = '';
let items = [];

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController, public apiConnection : ApiConnectionProvider, private scanner : BarcodeScanner) {
      
  }

  openBarcodeScanner(){
    this.scanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
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
        items = result['results'].offers;
        name = result['results'].name;
      }
    }catch (error){
      console.log("ERROR: ", error);
    }
  }

}
