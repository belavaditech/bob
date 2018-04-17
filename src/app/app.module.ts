import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { ListPage } from '../pages/list/list';
import { BankEntryPage } from '../pages/bankentry/bankentry';
import { BankEntryService } from '../pages/bankentry/bankentry-service';
import { AuctionService } from '../pages/auctionitems/auction.service';
import { AuctionListPage } from '../pages/auctionitems/list';
import { AddItemPage } from '../pages/add-item/add-item';
import { AuctionItemDetailsPage } from '../pages/auctionitems/item-details/item-details';


import { FeedPage } from '../pages/feed/feed';
import { FeedService } from '../pages/feed/feed.service';
import { Http } from '@angular/http';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserdataProvider } from '../providers/userdata/userdata';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ItemDetailPage,
    ListPage,
    BankEntryPage,
    AddItemPage,
	AuctionListPage,
	AuctionItemDetailsPage,
	FeedPage
  ],
  imports: [
    BrowserModule,
	HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ItemDetailPage,
    BankEntryPage,
    ListPage,
    AddItemPage,
	AuctionListPage,
	AuctionItemDetailsPage,
	FeedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	FeedService,
	AuctionService,
	BankEntryService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserdataProvider
  ]
})
export class AppModule {}
