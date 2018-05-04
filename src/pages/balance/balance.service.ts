import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class BalanceService {
  constructor(public http: Http) {}

  getBalances(addr: any): any {
     var address = '2N43g2SV2PRp3FJUZ92NHDYY36QckV6mSP9'
      if(addr)
      {
	     address = addr.data;
      }
     var url = 'https://api.blockcypher.com/v1/btc/test3/addrs/';

   
    return this.http.get(url+address+"/full").map(res => res.json());
               
  }
  
   
   
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  } 
}
