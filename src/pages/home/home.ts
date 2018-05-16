import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScanPage } from '../scan/scan';
//import { SpinnerDialog } from '@ionic-native/spinner-dialog';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  countries = ['at','au','be','br','ca','ch','cz','de','dk','es','fr','gb','ie','in',
               'it','jp','mx','my','nl','no','ph','pl','ru','se','sg','tr','us'];

// private spinnerDialog: SpinnerDialog
  constructor(public navCtrl: NavController) {
      
  }

  selectCountry(country){
    console.log(country);
    this.navCtrl.push(ScanPage, {'country': country});
  }

}
