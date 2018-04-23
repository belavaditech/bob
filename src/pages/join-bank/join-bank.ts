import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

declare var foo;
 
@Component({
  selector: 'page-join-bank',
  templateUrl: 'join-bank.html'
})
export class JoinBankPage {
 
  bankname: string;
  bankid: string;
  publickey: string;
  privatekey: string;
  linkaddress: string;
  redeemscript: string;
 
  constructor(public navCtrl: NavController, public view: ViewController) {
 
      this.publickey= 'pub-key-577777';
      this.privatekey= 'priv-key-577777';
  }
 
  saveItem(){
 
    let newItem = {
//      bankname: this.bankname,
      aadharid: this.aadharid,
      phonenumber: this.phonenumber
//      bankid: this.bankid,
//	publickey: this.publickey,
//	privatekey : this.privatekey

    };
 
    this.view.dismiss(newItem);
 
  }
 
  close(){
    this.view.dismiss();
  }
 
}
