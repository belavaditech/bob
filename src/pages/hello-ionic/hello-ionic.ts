import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item'
import { ItemDetailPage } from '../item-detail/item-detail'
import { BankEntryService } from '../bankentry/bankentry-service'
import { UserdataProvider } from '../../providers/userdata/userdata'

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {


  public items = [];
 
  constructor(public navCtrl: NavController, 
		public modalCtrl: ModalController, 
		public bankentryservice: BankEntryService, 
		public dataService: UserdataProvider ) {


    this.dataService.getuserdata().then((todos) => {
 
      if(todos){
        this.items = todos;
      }
 
    });
 
  }


 
  ionViewDidLoad(){
 
  }

 
  addItem(){
 
    let addModal = this.modalCtrl.create(AddItemPage);
 
    addModal.onDidDismiss((item) => {
 
	var getlink = {
	publickey: item.publickey
	};
	this.bankentryservice.createBankEntry(item).subscribe((data1)=> {

        var data = data1.ops[0];
	item.redeemscript = data.redeemscript;
	item.linkaddress = data.linkaddress;
 	 console.log(JSON.stringify(data));
        console.log("created this="+data);

          if(item){
            this.saveItem(item);
          }
	});

 
    });
 
    addModal.present();
 
  }
 
  deleteItem(id){
    this.items.splice(id, 1);
    this.dataService.saveuserdata(this.items);
  }

  saveItem(item){
    this.items.push(item);

    this.dataService.saveuserdata(this.items);
  }
 
  viewItem(item){
   this.navCtrl.push(ItemDetailPage, {
      item: item
    }); 
  }
}
