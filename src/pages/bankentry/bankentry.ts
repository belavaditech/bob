import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { BankEntryService } from './bankentry-service';
import { BankItemModel } from './bank.model';
import { Http } from '@angular/http';




@Component({
  selector: 'page-bank-entry',
  templateUrl: 'bankentry.html'
})
export class BankEntryPage {
  selectedItem: any;
  bankitem: BankItemModel = new BankItemModel();
  producer: any;
   icons: string[];
  items: Array<any>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public entryservice: BankEntryService, public http: Http) {

    // If we navigated to this page, we will have an item available as a nav param
    //this.selectedItem = navParams.get('item');
	
		
this.items=[];	
  }

  ionViewDidLoad() {

  var bankdata = {
                bankid: 'test'
        };
        this.entryservice.getBankEntries(bankdata).subscribe((posts: any) => {
          console.log(posts);

          for(var i=0; i< posts.length; i++) {
                        this.items.push(posts[i]) ; //= posts;
          }
         // this.loading.dismiss();

    });
  }
  
}
