import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class TransferService {

  outputtospend : any;
  outputstospend : any;
  txs : any;

  constructor(public http: Http) {
  }

  getBalances(addr: any): any {
     var address = '2N43g2SV2PRp3FJUZ92NHDYY36QckV6mSP9'
      if(addr)
      {
	     address = addr;
      }
     var url = 'https://api.blockcypher.com/v1/btc/test3/addrs/';

   
    return this.http.get(url+address+"/full").map(res => res.json());
               
  }
  
  spendSingle(spend: any, target: any, amount: any): any {

     var address = '2N43g2SV2PRp3FJUZ92NHDYY36QckV6mSP9'
     var url = 'https://api.blockcypher.com/v1/btc/test3/addrs/';

               // .catch(this.handleError);

 
    return this.http.get(url+address+"/full").map(data =>  {
        this.txs = data.json().txs;
        console.log (this.txs);
	for(var i=0; i< this.txs; i++)
        {
	  for(var j=0; j< this.txs[i].outputs.length; j++) 
           {
	     if(!this.txs[i].outputs[j].spent_by)
             {
                // we are expecting to spend only this address money
                // we are expecting only one transaction output we need to spend
                // This needs change when multiple transaction outputs, need to be spent

	        if(this.txs[i].outputs[j].addresses[0] == address)
  buildsingletransaction(this.txs[i].outputs[j], 
	 this.txs[i].hash, j, this.txs[i].inputs[0].sequence, target, spend, amount);
                  
             }
           }
        } return 1; } 
        );

               
  }

  buildsingletransaction(output: any, txid, index, sequence, target, spend, amount): any {

var commissionaddress = "2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF";

var scriptPubKey = bitcoin.address.toOutputScript(commissionaddress, bitcoin.networks.testnet);
var targetscriptPubKey = bitcoin.address.toOutputScript(target, bitcoin.networks.testnet);

// unlock using custom contract input
var tx1 = txid
var indextospend = index;
var outscriptPubKey = targetScriptPubkey;
var available = output.value;
var commision = output.value * 0.01; // 1%
var commaddr = scriptPubKey; // 1%
var fees = 1000;
var amount = available - commision - fees;
var redeemScript = spend.redeemscript;
var tx = sa.getSignedTxToGetFundfromSA(sa,redeemScript, outscriptPubKey,
  indextospend, amount, commision, commaddr, sequence,
  tx1, spend.keypair, bitcoin.networks.testnet);

console.log(tx.toHex());


  }
   
   
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  } 
}
