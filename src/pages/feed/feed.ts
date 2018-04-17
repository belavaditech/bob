import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';


import 'rxjs/Rx';

import { FeedModel } from './feed.model';
import { FeedService } from './feed.service';


@Component({
  selector: 'feed-page',
  templateUrl: 'feed.html'
})
export class FeedPage {
  feed: FeedModel = new FeedModel();
  loading: any;

  constructor(
    public nav: NavController,
    public feedService: FeedService,
    // public navParams: NavParams,
    public loadingCtrl: LoadingController

  ) {
    //this.feed.category = navParams.get('category');

    this.loading = this.loadingCtrl.create();
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
	this.feedService
      .getPosts().subscribe(posts  => {
      this.feed.posts = posts;
    });
	
  }

  
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  
}
