import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transfer',
  templateUrl: 'transfer.html',
})
export class TransferPage {


  bankname;
  bankid;
  publickey;
  linkaddress;
  redeemscript;
  amount: any;
 
  constructor(public navParams: NavParams){
 
	this.amount = 101010;
  }
 
  ionViewDidLoad() {
    this.bankname = this.navParams.get('item').bankname;
    this.bankid = this.navParams.get('item').bankid;
    this.publickey = this.navParams.get('item').publickey;
    this.linkaddress = '2a46s7575bc5666';
    this.redeemscript = this.navParams.get('item').redeemscript;
  }

}
