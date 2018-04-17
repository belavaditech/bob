import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankEntryPage } from './bankentry';

@NgModule({
  declarations: [
    BankEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(BankEntryPage),
  ],
})
export class BankEntryPageModule {}
