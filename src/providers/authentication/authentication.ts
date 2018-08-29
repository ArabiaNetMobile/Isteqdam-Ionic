import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  constructor(private storage: Storage) {

  }

  authenticateUser(userAuthentiaction){
    if(userAuthentiaction['code'] != '301'){
      console.log('USER ID ' + userAuthentiaction['user_id']);
      this.storage.set('userID',userAuthentiaction['user_id']);
      return true;
    }else{
      return false;
    }
  }

    authorizeUser(userAuthorization){
        if(userAuthorization['code'] == '4000'){
            return -1; //Means user has been blocked
        }else if(userAuthorization['code'] == '3000'){
            return 0; //Means user has been logged out from system and should re-login
        }else{
            return 1;//Means user still exist logged in system and can use app services
        }
    }


}
