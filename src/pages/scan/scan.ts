import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, IonicPage } from 'ionic-angular';
import { ApiConnectionProvider } from '../../providers/api-connection/api-connection';
import { ResultSearchPage } from '../result-search/result-search';
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  countries = ['at', 'au', 'be', 'br', 'ca', 'ch', 'cz', 'de', 'dk', 'es', 'fr', 'gb', 'ie', 'in',
    'it', 'jp', 'mx', 'my', 'nl', 'no', 'ph', 'pl', 'ru', 'se', 'sg', 'tr', 'us'];

  barcode: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiConnection: ApiConnectionProvider,
    public modalCtrl: ModalController, public loadingCtrl: LoadingProvider) {
    this.barcode = this.navParams.get('barcode');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }

  selectCountry(country) {
    console.log(country);
    this.loadingCtrl.presentWithGif();
    this.getData(country, this.barcode);
  }

  public async getData(country, values) {
    try {
      const [result, error] = await this.apiConnection.send(country, values);
      if (error) {
        console.log("ERROR HERE");
        console.log(error);
      } else if (result) {
        console.log(result);
        this.loadingCtrl.dismiss();
        let name = result['results'].name;
        let image = result['results'].imageUrl;
        let description = result['results'].description;
        let items = result['results'].offers;
        this.openResult(name, image, description, items);
      }
    } catch (error) {
      this.loadingCtrl.dismiss();
      console.log("ERROR: ", error);
    }
  }

  openResult(name, image, description, items) {
    this.navCtrl.push(ResultSearchPage, { 'name': name, 'items': items, 'image': image, 'description': description, 'barcode': this.barcode });
  }

}
