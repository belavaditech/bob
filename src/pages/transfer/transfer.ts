import { Component } from '@angular/core';
import { LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { BalanceService } from '../balance/balance.service';
import { TransferService } from '../transfer/transfer.service';


/**
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transfer',
  templateUrl: 'transfer.html',
})
export class TransferPage {

  toaddress : any;
  amount: any;
  transferitem: any;
  balance: any;
  loading: any;
  keyPair: any;
 
  constructor(public navParams: NavParams,
	public loadingCtrl: LoadingController,
	public transferService: TransferService,
        public balanceService: BalanceService){
 
    this.loading = this.loadingCtrl.create();

    this.amount = 0;
    this.transferitem = this.navParams.get('item');
    this.keyPair = this.navParams.get('keyPair');
    this.toaddress = this.transferitem.linkaddress;
    this.balance = {
	balance: 0
	};
  }
 
  ionViewDidLoad() {
  this.loading.present();

     var address = {
        data: this.transferitem.linkaddress
        };
//https://stackoverflow.com/questions/42104629/angular-2-checking-for-server-errors-from-subscribe

      this.balanceService
      .getBalances(address).subscribe(posts  => {
      this.balance = posts;
        this.loading.dismiss();
    }, error => {
        console.log(error);
        this.loading.dismiss();
    });

  }

  doTransfer()
  {
    this.loading = this.loadingCtrl.create();
     var spend = {
        linkaddress: this.transferitem.linkaddress,
        redeemscript: this.transferitem.redeemscript,
        keyPair: this.keyPair	
        };

//https://stackoverflow.com/questions/42104629/angular-2-checking-for-server-errors-from-subscribe

      this.transferService
//      .spendSingle(spend, this.toaddress, this.amount).subscribe(posts  => {
      .spendAll(spend, this.toaddress, this.amount).subscribe(posts  => {
        alert (JSON.stringify(posts));
        this.loading.dismiss();
    }, error => {
        console.log(error);
        this.loading.dismiss();

    });
  }



}
