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
  phonenumber: string;
  aadharid: string;
 
  constructor(public navCtrl: NavController, public view: ViewController) {
 
      this.phonenumber= '';
      this.aadharid= '';
  }
 
  saveItem(){
 
    let newItem = {
      aadharid: this.aadharid,
      phonenumber: this.phonenumber

    };
 
    this.view.dismiss(newItem);
 
  }
 
  close(){
    this.view.dismiss();
  }
 
}
