import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { BalanceService } from './balance.service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class BalancePage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  balances: Array <any>;
  balance: any;
  balanceitem: any;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
 	public loadingCtrl: LoadingController,
	public balanceService: BalanceService) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    this.loading = this.loadingCtrl.create();

    this.balanceitem = this.navParams.get('item');


    this.balances = [];
    this.balance = {
	address: this.balanceitem.linkaddress,
	balance: 0,
	unconfirmed_n_tx :0 ,
	unconfirmed_balance :0 ,
	final_balance :0 


	};


  }

  ionViewDidLoad() {
    this.loading.present();

     var address = {
	data: this.balanceitem.linkaddress
	};
//https://stackoverflow.com/questions/42104629/angular-2-checking-for-server-errors-from-subscribe

      this.balanceService
      .getBalances(address).subscribe(posts  => {
//	alert(JSON.stringify(posts));
      this.balance = posts;
	//console.log(this.balances);
        this.loading.dismiss();
    }, error => {
	console.log(error);
        this.loading.dismiss();
    });

  }


  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
