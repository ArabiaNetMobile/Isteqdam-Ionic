import { Injectable } from '@angular/core';

/*
  Generated class for the ValidatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ValidatorProvider {

  constructor() {
  }



    validateConfrimCode(confirmCode : string){
        if(confirmCode.length == 6){
            return true;
        }else{
            return false;
        }
    }

  validatePhoneNumber(phoneNumber : string){
    if(phoneNumber.length >= 8){
        return true;
    }else{
      return false;
    }
  }

    validateName(name : string){
        if(name.length >= 4){
            return true;
        }else{
            return false;
        }
    }

    validateMail(mail : string){
        var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regexp.test(mail);
    }

}
