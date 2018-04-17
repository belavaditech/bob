import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { AuctionItemDetailsPage } from './item-details/item-details';
import { AuctionItemModel } from './auction.model';
import { AuctionService } from './auction.service';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class AuctionListPage {
  icons: string[];
  items: Array<any>;
  

  // feed: AuctionItemModel = new AuctionItemModel();
  loading: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public auctionservice: AuctionService, public loadingCtrl: LoadingController ) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

	this.loading = this.loadingCtrl.create();
    this.items = [];
	/*
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    } */
  }
  
    ionViewDidLoad() {
    this.loading.present();
    
	this.auctionservice
      .getAuctionItem().subscribe(posts  => {
      this.items = posts;
	  this.loading.dismiss();
    });
	
  }
  

  itemTapped(event, item) {
    this.navCtrl.push(AuctionItemDetailsPage, {
      item: item
    });
  }
}
