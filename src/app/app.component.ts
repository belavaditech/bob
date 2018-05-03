import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { BankFrontPage } from '../pages/bank-front/bank-front';
import { BankAdminPage } from '../pages/bank-admin/bank-admin';
import { ListPage } from '../pages/list/list';
import { FeedPage } from '../pages/feed/feed';
import { AuctionListPage } from '../pages/auctionitems/list';
import { BankEntryPage } from '../pages/bankentry/bankentry';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

declare var foo;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = BankFrontPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

//    alert(JSON.stringify(foo.bitcoin.networks.testnet));

    // set our app's pages
    this.pages = [
      { title: 'Bank Front', component: BankFrontPage },
	  { title: 'AuctionList', component: AuctionListPage },
	  { title: 'BankAdmin', component: BankAdminPage },
	  { title: 'BankLinking', component: BankEntryPage },
	  { title: 'UserLinking', component: AuctionListPage },
	  { title: 'DCBBANK', component: AuctionListPage },
	  { title: 'ProtocolOptional', component: AuctionListPage },
	  { title: 'Test', component: AuctionListPage },
	  { title: 'Feed', component: FeedPage },
      { title: 'My First List', component: ListPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
