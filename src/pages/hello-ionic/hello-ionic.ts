import { Component } from '@angular/core';
import { ViewController, ModalController, NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item'
import { JoinBankPage } from '../join-bank/join-bank'
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
  private item : any;
  
  constructor(public navCtrl: NavController, 
		public modalCtrl: ModalController, 
		public viewCtrl: ViewController, 
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
/*
  closeModal() {
    this.viewCtrl.dismiss();
  }
*/
  clearcache()
  {
    this.userdata = [];
    this.dataService.saveuserdata(this.userdata);

  }

  joinBank(whichbank){
 
    this.item = {};    
    let addModal = this.modalCtrl.create(JoinBankPage);
 
    addModal.onDidDismiss((userprofile) => {
     
	alert(JSON.stringify(userprofile));

	var getlink = {
        chosenbank: whichbank,
        network: bitcoin.networks.testnet,
	phonenumber: userprofile.phonenumber,
	publickey: this.keyPair.getPublicKeyBuffer().toString('hex')
	};

        this.item.phonenumber = userprofile.phonenumber;
        this.item.chosenbank = whichbank;

	this.bankentryservice.createBankEntry(getlink).subscribe((data1)=> {

        var data = data1.ops[0];
	this.item.redeemscript = data.redeemscript;
	this.item.linkaddress = data.linkaddress;
 	 console.log(JSON.stringify(data));
        console.log("created this="+data);

          if(this.item){
            this.saveItem(this.item);
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
    var found = this.items.find(x=>x.redeemscript == item.redeemscript)
    if(found == null)
    {
    console.log('redeemscript not entry found:'+JSON.stringify(found));
    this.items.push(item);
    this.userdata[this.currentuser] = this.items;
    this.dataService.saveuserdata(this.userdata);
    }
    else {
    console.log('redeemscript entry found:' + JSON.stringify(found));
    }
  }
/* 
  saveJoinBank(item){
    this.items.push(item);
    this.userdata[this.currentuser] = this.items;
    this.dataService.saveuserdata(this.userdata);
  }
*/
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
