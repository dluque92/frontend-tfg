import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScanPage } from '../scan/scan';

/**
 * Generated class for the ResultSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result-search',
  templateUrl: 'result-search.html',
})

export class ResultSearchPage {

  name : any;
  image : any; 
  description: any;
  items : any;
  barcode : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = this.navParams.get('name');
    this.image = this.navParams.get('image');
    this.description = this.navParams.get('description');
    this.items = this.navParams.get('items');
    this.barcode = this.navParams.get('barcode');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultSearchPage');
  }

  goWebpage(url){
    window.open(url, '_system', 'location=yes'); 
    return false;
  }

  search(){
    this.navCtrl.push(ScanPage, {'barcode': this.barcode});
  }

}
