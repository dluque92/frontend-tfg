import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SocialSharing } from '@ionic-native/social-sharing';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { AdMobFree } from '@ionic-native/admob-free'; 
// import { AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ScanPage } from '../pages/scan/scan';
import { ResultSearchPage } from '../pages/result-search/result-search';
import { ApiConnectionProvider } from '../providers/api-connection/api-connection';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ScanPage,
    ResultSearchPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ScanPage,
    ResultSearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    SocialSharing,
    UniqueDeviceID,
    AdMobFree,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiConnectionProvider,
    SpinnerDialog
  ]
})
export class AppModule {}
