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
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {


  bankname;
  bankid;
  publickey;
  linkaddress;
  redeemscript;
  bankitem : any;
 
  constructor(public navParams: NavParams){
  this.bankitem = {};
 
    this.bankitem = this.navParams.get('item');
  }
 
  ionViewDidLoad() {
    /*this.bankname = this.navParams.get('item').bankname;
    this.bankid = this.navParams.get('item').bankid;
    this.publickey = this.navParams.get('item').publickey;
    this.linkaddress = this.navParams.get('item').linkaddress;
    this.redeemscript = this.navParams.get('item').redeemscript;
  */
  }

}
