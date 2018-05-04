import { Injectable } from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';



declare var foo;
declare var roo;


@Injectable()
export class TransferService {

  outputtospend : any;
  outputstospend : any;
  txs : any;
  httpitem: Observer <any>;

  constructor(public http: Http) {
  }

  getBalances(addr: any): any {
     var address = '2N43g2SV2PRp3FJUZ92NHDYY36QckV6mSP9'
      if(addr)
      {
	     address = addr.data;
      }
     var url = 'https://api.blockcypher.com/v1/btc/test3/addrs/';
   
    return this.http.get(url+address+"/full").map(res => res.json());
               
  }
  
  spendSingle(spend: any, target: any, amount: any): any {

     var address = '2N43g2SV2PRp3FJUZ92NHDYY36QckV6mSP9'
      if(spend)
      {
	     address = spend.linkaddress;
      }
     var url = 'https://api.blockcypher.com/v1/btc/test3/addrs/';

               // .catch(this.handleError);

 
    return this.http.get(url+address+"/full").map(data =>  {
        this.txs = data.json().txs;
        var spendabletx ;
 
	for(var i=0; i< this.txs.length; i++)
        {
	  for(var j=0; j< this.txs[i].outputs.length; j++) 
           {
	      if(!this.txs[i].outputs[j].spent_by)
             {
                // we are expecting to spend only this address money
                // we are expecting only one transaction output we need to spend
                // This needs change when multiple transaction outputs, need to be spent

	        if(this.txs[i].outputs[j].addresses[0] == address)
  	      spendabletx  = this.buildsingletransaction(this.txs[i].outputs[j], 
	 this.txs[i].hash, j, this.txs[i].inputs[0].sequence, 
	 target, spend, amount);
                  
             }
           }
        }  
		return spendabletx  } 
        ).flatMap(tx=> {
             return this.sendtx(tx);
	 // console.log(msg);
        });
    /*

             var msg = this.sendtx(spendabletx);
		console.log(msg);
		 return msg; }  */
               
  }

  buildsingletransaction(output: any, txid, index, sequence, target, spend, anyamount): any {

var commissionaddress = "2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF";

var scriptPubKey = foo.bitcoin.address.toOutputScript(commissionaddress, foo.bitcoin.networks.testnet);
var targetScriptPubKey = foo.bitcoin.address.toOutputScript(target, foo.bitcoin.networks.testnet);
//var targetScriptPubKey = scriptPubKey;

// unlock using custom contract input
var tx1 = txid
var indextospend = index;
var outscriptPubKey = targetScriptPubKey;
var available = output.value;
var commision = output.value * 0.01; // 1%
var commaddr = scriptPubKey; // 1%
var fees = 1000;
var amount = available - commision - fees;
var redeemScript = new foo.Buffer.Buffer(spend.redeemscript, 'hex');
var sa ='hhh';

var tx = foo.sinkaddress.sinkaddresslib.getSignedTxToGetFundfromSA(sa,redeemScript, outscriptPubKey,
  indextospend, amount, commision, commaddr, sequence,
  tx1, spend.keyPair, foo.bitcoin.networks.testnet);
console.log("this is test: " +tx.toHex());
  return tx;

  }
   
  sendtx(tx):any {
   var pushtx = {
    hexTx: tx
   };


 /*  let headers = new Headers();
    headers.append('Origin', 'http://10.1.2.0:8100');
    headers.append('Referer', 'http://10.1.2.0:8100/');

*/
   var url = 'https://api.blockcypher.com/v1/btc/test3/txs/push';
   
   return this.http.post(url, JSON.stringify(pushtx) ).map(res => res.json());

/*
roo.request({method:'POST', url:url, json:JSON.stringify(pushtx)}, this.on_response)

  return this.createObservable();
*/

  } 

on_response(er, response, body) {
  if(er)
    throw er
    console.log(JSON.stringify(body));
  this.httpitem.next(response);
}

 createObservable() : Observable<any> {
      return Observable.create((observer: Observer<any>) => {


        this.httpitem = observer;
      });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  } 
}
