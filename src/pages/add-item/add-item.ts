import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

declare var foo;
 
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html'
})
export class AddItemPage {
 
  bankname: string;
  bankid: string;
  publickey: string;
  privatekey: string;
  linkaddress: string;
 
  constructor(public navCtrl: NavController, public view: ViewController) {
 
  }
 
  saveItem(){
 
    let newItem = {
      bankname: this.bankname,
      bankid: this.bankid
    };
 
    this.view.dismiss(newItem);
 
  }
 
  close(){
    this.view.dismiss();
  }
 
}
