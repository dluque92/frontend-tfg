import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultSearchPage } from './result-search';

@NgModule({
  declarations: [
    ResultSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultSearchPage),
  ],
})
export class ResultSearchPageModule {}
