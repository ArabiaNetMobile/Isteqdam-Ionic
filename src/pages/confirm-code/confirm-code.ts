import { Component } from '@angular/core';
import {Alert, AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import { ValidatorProvider } from '../../providers/validator/validator';
import { WebServiceProvider } from "../../providers/WebService/WebService";
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Storage } from '@ionic/storage';
import { HomePage } from "../home/home";
import { RegisterPage } from "../register/register";
import { TranslateService } from '@ngx-translate/core';


/**
 * Generated class for the ConfirmCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-code',
  templateUrl: 'confirm-code.html',
  viewProviders: [ValidatorProvider,WebServiceProvider,LoadingController,AlertController,AuthenticationProvider]

})
export class ConfirmCodePage {

  firstChar : string;
  secondChar : string;
  thirdChar : string;
  fourthChar : string;
  fifthChar : string;
  sixthChar : string;
  phoneNumber : string;
  smsToken : string;
  loadingController : Loading;
  serverFailAlert : Alert;
  networkFailAlert : Alert;
  unValidConfirmCode : Alert;
  wrongConfirmCode : Alert;
  confirmationCode : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public networkManager : WebServiceProvider,
              public loadingCtrl: LoadingController,public alertController : AlertController,
              public validator : ValidatorProvider,public authentication : AuthenticationProvider,public storage : Storage,public translateService: TranslateService) {
    this.smsToken = this.navParams.get('token');
    this.phoneNumber = this.navParams.get('phoneNumber');
  }

  ionViewDidLoad() {
  }

  confirmCode(){
    this.confirmationCode = this.firstChar + this.secondChar + this.thirdChar ;
    this.confirmationCode +=  this.fourthChar + this.fifthChar + this.sixthChar;
    this.confirmationCode = String(this.confirmationCode).replace(/\s/g, "");
    if (this.validator.validateConfrimCode(this.confirmationCode)){

        let params = {confirm_code : this.confirmationCode,token:this.smsToken};
        this.networkManager.validateConfirmationCode(params,false,
            ()=>{

                this.translateService.get('waintingRequest').subscribe(
                    title => {
                        this.loadingController = this.loadingCtrl.create({
                            content: title
                        });
                        this.loadingController.present();
                    }
                )


            },()=>{
                this.loadingController.dismiss();
            },(response)=>{
                console.log(response);
                if (response['code'] == '200'){
                    let authenticateResult = this.authentication.authenticateUser(response['data']);
                    if (authenticateResult){
                        this.networkManager.loginWithUserID(false,
                            ()=>{
                                this.translateService.get('waintingRequest').subscribe(
                                    loading => {
                                        this.loadingController = this.loadingCtrl.create({
                                            content: loading
                                        });
                                        this.loadingController.present();
                                    }
                                )

                            },()=>{
                                this.loadingController.dismiss();
                            },(response)=>{
                                if(response['code'] == '200'){
                                    console.log('SID ' , response['session_token']);
                                    this.storage.set('SID',response['session_token']);
                                    this.navCtrl.push(HomePage);
                                }else{
                                    this.translateService.get('serverError').subscribe(
                                        title => {
                                            this.translateService.get('confirm').subscribe(
                                                btn => {
                                                    this.serverFailAlert = this.alertController.create({
                                                        title: '',
                                                        subTitle: title,
                                                        buttons: [btn]
                                                    });
                                                    this.serverFailAlert.present();
                                                }
                                            )
                                        }
                                    )
                                }

                            },()=>{

                                this.translateService.get('networkError').subscribe(
                                    title => {
                                        this.translateService.get('confirm').subscribe(
                                            btn => {
                                                this.networkFailAlert = this.alertController.create({
                                                    title: '',
                                                    subTitle: title,
                                                    buttons: [btn]
                                                });
                                                this.networkFailAlert.present();                                            }
                                        )
                                    }
                                )

                            });
                    }else{
                        //Register Screen

                        this.navCtrl.push(RegisterPage,{confirmCode : this.confirmationCode,mobileNumber : this.phoneNumber});
                    }
                }else{

                    this.translateService.get('confirmCode.wrongConfirmCode').subscribe(
                        title => {
                            this.translateService.get('confirm').subscribe(
                                btn => {
                                    this.wrongConfirmCode = this.alertController.create({
                                        title: '',
                                        subTitle: 'Wrong Confirm Code',
                                        buttons: ['Dismiss']
                                    });
                                    this.wrongConfirmCode.present();
                                }
                            )
                        }
                    )


                }
            },()=>{
                this.translateService.get('networkError').subscribe(
                    title => {
                        this.translateService.get('confirm').subscribe(
                            btn => {
                                this.networkFailAlert = this.alertController.create({
                                    title: '',
                                    subTitle: title,
                                    buttons: [btn]
                                });
                                this.networkFailAlert.present();                                            }
                        )
                    }
                )
            });

    }else{
        this.translateService.get('confirmCode.wrongConfirmCode').subscribe(
            title => {
                this.translateService.get('confirm').subscribe(
                    btn => {
                        this.wrongConfirmCode = this.alertController.create({
                            title: '',
                            subTitle: 'Wrong Confirm Code',
                            buttons: ['Dismiss']
                        });
                        this.wrongConfirmCode.present();
                    }
                )
            }
        )
    }
  }

  resendCofirmCode(){
      let params = {mobile_num:this.phoneNumber};
      this.networkManager.requestConfirmationCode(params,false,
          ()=>{
              this.loadingController = this.loadingCtrl.create({
                  content: 'Please wait...'
              });
              this.loadingController.present();
          },()=>{
              this.loadingController.dismiss();
          },(response)=>{
              if (response['code'] == "200"){
                  this.navCtrl.push(ConfirmCodePage,{token: response['token'],phoneNumber : this.phoneNumber});
              }else{

                  this.translateService.get('serverError').subscribe(
                      title => {
                          this.translateService.get('confirm').subscribe(
                              btn => {
                                  this.serverFailAlert = this.alertController.create({
                                      title: '',
                                      subTitle: title,
                                      buttons: [btn]
                                  });
                                  this.serverFailAlert.present();
                              }
                          )
                      }
                  )

              }
          },()=>{

              this.translateService.get('networkError').subscribe(
                  title => {
                      this.translateService.get('confirm').subscribe(
                          btn => {
                              this.networkFailAlert = this.alertController.create({
                                  title: '',
                                  subTitle: title,
                                  buttons: [btn]
                              });
                              this.networkFailAlert.present();                                            }
                      )
                  }
              )

          });
  }

  changePhoneNumber(){
    this.navCtrl.pop();
  }

}
