import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserdataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserdataProvider {

  constructor(public storage: Storage) {
    console.log('Hello UserdataProvider Provider');
  }

  getuserdata() {
    return this.storage.get('userdata'); 
  }
 
  saveuserdata(data){
    this.storage.set('userdata', data);
  }
 

}
