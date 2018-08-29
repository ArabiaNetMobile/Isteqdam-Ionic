import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Storage } from '@ionic/storage';


/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebServiceProvider {

//        this.postBaseURL = "https://arabia2web.net/client6.119/program/webservice.php?f=";
//        this.getBaseURL = "https://arabia2web.net/client6.119/program/webservice-get.php?f=";
//        this.APIKey = "_com_229mNi6_22";
//        this.APIToken = "8@*****h^@@B!^^^G@****g@^g";

    baseURLPost = "http://192.168.3.16/isteqdam/program/webservice.php?f=";
    baseURLGet = "http://192.168.3.16/isteqdam/program/webservice-get.php?f=";




    constructor(public http: HTTP,private uniqueDeviceID: UniqueDeviceID,private storage: Storage) {
    this.http = http;
  }

  // callFunctionOnWebService(functionName : string,functionParams : any,isGetRequest : boolean,beforeRequest : Function
  //                          ,afterRequest : Function,onSuccess : Function,onFail : Function,onNetworkFail : Function){
  //                             this.http.post()
  //                           }

    private callFunctionOnWebService(functionName : string,functionParams : Object,isGetRequest : Boolean,beforeRequest : Function,
                             afterRquest : Function,onSuccess : Function,onFail : Function){

      functionParams['_com_i8j3b8n7jj'] = '8!6^5h%g$$G';
      beforeRequest();
      console.log(functionParams);
      if (isGetRequest){
          this.http.setDataSerializer("json");
          this.http.get(this.baseURLGet + functionName,functionParams,{}).then(
              data => {
                  afterRquest();
                  var jsonData = JSON.parse(data['data']);
                  onSuccess(jsonData);
              },
              err => {
                  console.log(err);
                  afterRquest();
                  onFail();
              }
          );
      }else{
          this.http.post(this.baseURLPost + functionName,functionParams,{}).then(
              data => {
                  console.log(data);
                  afterRquest();
                  var jsonData = JSON.parse(data['data']);
                  onSuccess(jsonData);
              },
              err => {
                  console.log(err);
                  afterRquest();
                  onFail();

              }
          );
      }
  }

  requestConfirmationCode(functionParams : Object,isGetRequest : Boolean,beforeRequest : Function,
                                     afterRquest,onSuccess : Function,onFail : Function){
        this.callFunctionOnWebService('send_sms',functionParams,false,beforeRequest,afterRquest,
            onSuccess,onFail);
    }

    validateConfirmationCode(functionParams : Object,isGetRequest : Boolean,beforeRequest : Function,
                            afterRquest,onSuccess : Function,onFail : Function){
        this.callFunctionOnWebService('checkConfirmation',functionParams,false,beforeRequest,afterRquest,
            onSuccess,onFail);
    }

    loginWithUserID(isGetRequest : Boolean,beforeRequest : Function,
                             afterRquest,onSuccess : Function,onFail : Function) {
        this.uniqueDeviceID.get()
            .then((uuid: any) => {
                this.storage.get('userID').then((val) => {
                    let functionParams = {device_ip : uuid,user_id:val};
                    this.callFunctionOnWebService('loginWithUserId',functionParams,false,beforeRequest,afterRquest,
                        onSuccess,onFail);
                });

            })
            .catch((error: any) => {
                onFail();
            });
    }

    registerUser(functionParams : Object,isGetRequest : Boolean,beforeRequest : Function,
                 afterRquest,onSuccess : Function,onFail : Function){
        this.callFunctionOnWebService('regiesterNewUser',functionParams,false,beforeRequest,afterRquest,
            onSuccess,onFail);
    }

    isUserLogged(isGetRequest : Boolean,beforeRequest : Function,
                 afterRquest,onSuccess : Function,onFail : Function) {
        this.storage.get('SID').then((SID)=>{
            this.storage.get('userID').then((userID)=>{
                let functionParams = {user_id : userID,session_token:SID};
                this.callFunctionOnWebService('isLogged',functionParams,false,beforeRequest,afterRquest,
                    onSuccess,onFail);
            }).catch((err)=>{
                onFail();
            });
        }).catch((err)=>{
            onFail();
        });
    }

    loginWithUserNameAndPasword(functionParams : object,isGetRequest : Boolean,beforeRequest : Function,
                 afterRquest,onSuccess : Function,onFail : Function){
        this.uniqueDeviceID.get().then((uuid)=>{
            functionParams['device_ip'] = uuid;
            this.callFunctionOnWebService('loginWithUsernamePassword',functionParams,false,beforeRequest,afterRquest,
                onSuccess,onFail);
        }).catch((err)=>{
            onFail();
        });

    }

}
