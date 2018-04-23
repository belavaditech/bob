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
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
 	public loadingCtrl: LoadingController,
	public balanceService: BalanceService) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    this.loading = this.loadingCtrl.create();

/*

    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    } 
   */
    this.balances = [];
    this.balance = {
	address: '00',
	balance: 0
	};
  }
  ionViewDidLoad() {
    this.loading.present();
    /* this.feedService
      .getPosts()
      .then(posts => {
        this.feed.posts = posts;
        this.loading.dismiss();
      }); 
          */

     var address = {
	data:'ddfsss'
	};

      this.balanceService
      .getBalances(address).subscribe(posts  => {
//	alert(JSON.stringify(posts));
      this.balance = posts;
	//console.log(this.balances);
        this.loading.dismiss();
    });

  }


  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
