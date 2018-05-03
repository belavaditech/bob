import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'; 
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';


import { BankItemModel } from '../bankentry/bank.model';

import * as io from 'socket.io-client';





@Injectable()
export class BankService {

  private basePath = '/tmp';
  recordname: any;

  socket:any;  
  observer:Observer<any>;  

  bankitems: Observer<BankItemModel[]> ; //= null; //  list of objects
  bankitem: Observer<BankItemModel> ; // = null; //   single object



  

  constructor() { 
    this.socket = io('http://localhost:8080/database'); 
	  this.recordname = "bankrecord"; 


  }
  
  getUserLinks(userdata:any): Observable<BankItemModel[]> {

   this.socket.on('userlinks', (res) => {
      this.bankitems.next(res);
      // this.observer.complete();
    });
	
	var query = {
		type: 'banklistall'
	};
	var pushdata = {
		query: query,
		recordname: this.recordname,
		data: userdata
	};
	    
    this.socket.emit('getUserlinks', pushdata);


    return this.createObservable();
  }
  getBankLinks(bankdata:any): Observable<BankItemModel[]> {

   this.socket.on('banklinks', (res) => {
      this.bankitems.next(res);
      // this.observer.complete();
    });
	
	var query = {
		type: 'banklistall'
	};
	var pushdata = {
		query: query,
		recordname: this.recordname,
		data: bankdata
	};
	    
    console.log(JSON.stringify(pushdata));
    this.socket.emit('getBanklinks', pushdata);


    return this.createObservable();
  }

  createObservable() : Observable<BankItemModel[]> {
      return Observable.create((observer: Observer<BankItemModel[]>) => {
        this.bankitems = observer;
      });
  }
  
  clearRecords(bankdata:any): Observable<BankItemModel[]> {

   this.socket.on('banklinks', (res) => {
      this.bankitems.next(res);
      // this.observer.complete();
    });
	
	var query = {
		type: 'banklistall'
	};
	var listalldata = {
		query: query,
		recordname: this.recordname,
		data: bankdata
	};
	    
    this.socket.emit('clearrecords', listalldata);


    return this.createObservable();
  }

  
  deleteItem(linkdata:any): Observable<BankItemModel[]> {

   this.socket.on('banklinks', (res) => {
      this.bankitems.next(res);
      // this.observer.complete();
    });
	
	var query = {
		type: 'banklistall'
	};
	var listalldata = {
		query: query,
		recordname: this.recordname,
		data: linkdata
	};
	    
    this.socket.emit('deletelink', listalldata);


    return this.createObservable();
  }
 /* 
  getObservable() : Observable<BankItemModel> {
      return Observable.create((observer: Observer<BankItemModel>) => {
        this.bankitem = observer;
      });
  }
  // Create a bramd new insurelist
  createBankEntry(bankitem: any): any {
	  var pushdata = {
		data: bankitem,
		recordname: this.recordname
	};
	    
   console.log(JSON.stringify(bankitem));
   this.socket.on('issuedlink', (res) => {
      this.bankitem.next(res);
      // this.observer.complete();
    });
    this.socket.emit('issuelink', pushdata);
    return this.getObservable();
  }
*/
  createErrorObservable() : Observable<any> {
      return Observable.create((observer: Observer<any>) => {
        this.observer = observer;
      });
  }  
  // Default error handling for all actions
  private handleError(error:any) {
    console.log(error)
  }

}
