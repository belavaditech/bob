import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item'
import { ItemDetailPage } from '../item-detail/item-detail'
import { TransferPage } from '../transfer/transfer'
import { BankEntryService } from '../bankentry/bankentry-service'
import { BalancePage } from '../balance/balancepage'
import { UserdataProvider } from '../../providers/userdata/userdata'

declare var foo;

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {


  public items = [];
  public userdata = [];
  public userwifs = [];
  public users = [];
  public currentuser : any;
  private keyPair : any;
  
  constructor(public navCtrl: NavController, 
		public modalCtrl: ModalController, 
		public bankentryservice: BankEntryService, 
		public dataService: UserdataProvider ) {

  this.userwifs = [
'cRgnQe1TQngWfnsLo9YUExBjx3iVKNHu2ZfiRcUivATuojDdzdus',
'cRgnQe1TQngWfnsKz7aamdbRm7d61bD12hoVbW2KXoTCUEVw5Pwn',
'cRgnQe1TQngWfnsKz7aamdbRm7d61bD12hoVbW2KX4dgGfnrcgQJ'
 ];

 this.users = [
 'bob',
 'peter',
 'trump'
 ];


 this.userdata.push([]);
 this.userdata.push([]);
 this.userdata.push([]);


 this.currentuser = 0;

 this.keyPair = foo.bitcoin.ECPair.fromWIF(
     this.userwifs[this.currentuser],
     foo.bitcoin.networks.testnet);


// alert(JSON.stringify(foo.bitcoin.networks.testnet));

    this.dataService.getuserdata().then((todos) => {
 
//      alert(JSON.stringify(todos));
      if(todos && todos.length != 0){
        this.items = todos[this.currentuser];
      }
 
    });
 
  }


 
  ionViewDidLoad(){
 
  }

 
  selectUser(selection){
  this.currentuser = selection;
  this.keyPair = foo.bitcoin.ECPair.fromWIF(
     this.userwifs[this.currentuser],
     foo.bitcoin.networks.testnet);

    this.dataService.getuserdata().then((todos) => {
 
      if(todos && todos.length != 0){
        this.items = todos[this.currentuser];
      }
 
    });
  }

  joinBank(){
 
    
    let addModal = this.modalCtrl.create(AddItemPage);
 
    addModal.onDidDismiss((userprofile) => {
     
//	alert(JSON.stringify(item));

	var getlink = {
	phonenumber: userprofile.phonenumber,
	publickey: this.keyPair.getPublicKeyBuffer()
	};
	this.bankentryservice.createBankEntry(getlink).subscribe((data1)=> {

        var data = data1.ops[0];
	item.redeemscript = data.redeemscript;
	item.linkaddress = data.linkaddress;
 	 console.log(JSON.stringify(data));
        console.log("created this="+data);

          if(item){
            this.saveJoinBank(item);
          }
	});

 
    });
 
    addModal.present();
 
  }
 
  deleteItem(id){
    this.items.splice(id, 1);
    this.userdata[this.currentuser] = this.items;
    this.dataService.saveuserdata(this.userdata);
  }

  deleteJoinBank(id){
    this.items.splice(id, 1);
    this.userdata[this.currentuser] = this.items;
    this.dataService.saveuserdata(this.userdata);
  }

  saveItem(item){
    this.items.push(item);
    this.userdata[this.currentuser] = this.items;
    this.dataService.saveuserdata(this.userdata);
  }
 
  saveJoinBank(item){
    this.items.push(item);
    this.userdata[this.currentuser] = this.items;
    this.dataService.saveuserdata(this.userdata);
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
