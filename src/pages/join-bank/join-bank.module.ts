import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoinBankPage } from './join-bank';

@NgModule({
  declarations: [
    JoinBankPage,
  ],
  imports: [
    IonicPageModule.forChild(JoinBankPage),
  ],
})
export class JoinBankPageModule {}
