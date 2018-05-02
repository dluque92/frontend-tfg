import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiConnectionProvider } from '../../providers/api-connection/api-connection';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public apiConnection : ApiConnectionProvider) {
      this.getData('es','9781449335588')
  }

  public async getData(country, values){
    try{
      const [result, error] = await this.apiConnection.send(country, values);
      if(error){
        console.log("ERROR HERE");
      }else if(result){
        console.log(result);
      }
    }catch (error){
      console.log("ERROR: ", error);
    }
  }

}
