import { Component } from '@angular/core';
import { ViewController, ModalController, NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item'
import { JoinBankPage } from '../join-bank/join-bank'
import { ItemDetailPage } from '../item-detail/item-detail'
import { TransferPage } from '../transfer/transfer'
import { BankService } from './bank-service'
import { BalancePage } from '../balance/balancepage'
import { UserdataProvider } from '../../providers/userdata/userdata'

declare var foo;

@Component({
  selector: 'page-bank-admin',
  templateUrl: 'bank-admin.html'
})
export class BankAdminPage {


  public items = [];
  public banks = [];
  private item : any;
  
  constructor(public navCtrl: NavController, 
		public modalCtrl: ModalController, 
		public viewCtrl: ViewController, 
		public bankservice: BankService
		) {
/*
  this.bankwifs = [
'91avARGdfge8E4tZfYLoxeJ5sGBdNJQH4kvjJoQFacbgx3cTMqe',
'91avARGdfge8E4tZfYLoxeJ5sGBdNJQH4kvjJoQFacbgww7vXtT'
 ];

*/

 this.banks = [
 'ICICI',
 'DCB'
 ];



 
  }


 
  ionViewDidLoad(){
 
  }

 

  electBank(whichbank){
	var getlinks = {
        chosenbank: whichbank,
        network: foo.bitcoin.networks.testnet,
        };

	this.bankservice.getBankLinks(getlinks).subscribe((data1)=> {
 	 console.log(JSON.stringify(data1));
        if(Array.isArray(data1) )
        {
	  // getting already created link
	this.items = data1;

         }
        });
  }

  clearRecords(chosenbank)
  {

        var recordtoDelete = {
        chosenbank: chosenbank
        };

	this.bankservice.clearRecords(recordtoDelete).subscribe((data1)=> {
	
        });
  }
 
  deleteItem(id){
    var itemstoremove = this.items.splice(id, 1);
        var removelink = {
        linktoremove: itemstoremove[0]
        };
	this.bankservice.deleteItem(removelink).subscribe((data1)=> {
	
        });
  }



  viewItem(item){
   this.navCtrl.push(ItemDetailPage, {
      item: item
    }); 
  }

  balancePage(item){
   this.navCtrl.push(BalancePage, {
      item: item
    }); 
  }
  Transfer(item){

   this.navCtrl.push(TransferPage, {
      item: item
    }); 

  }
}
