import { Component } from '@angular/core';
import {Alert, AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import { WebServiceProvider } from "../../providers/WebService/WebService";
import { Storage } from '@ionic/storage';
import { ValidatorProvider } from '../../providers/validator/validator';
import {AuthenticationProvider} from "../../providers/authentication/authentication";
import {ConfirmCodePage} from "../confirm-code/confirm-code";
import {HomePage} from "../home/home";
import { TranslateService } from '@ngx-translate/core';





/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  viewProviders: [ValidatorProvider,WebServiceProvider,LoadingController,AlertController,AuthenticationProvider]

})
export class RegisterPage {

  mobileNumber : string;
  password : string;
  nickName : string;
  email : string;
  fName : string;
  lName : string;
  id : string;
  loadingController : Loading;
  serverFailAlert : Alert;
  networkFailAlert : Alert;
  wrongFieldAlert : Alert;
  dupicatedIDAlert : Alert;

  constructor(public navCtrl: NavController, public navParams: NavParams,public webService : WebServiceProvider,
              public storage : Storage,public loadingCtrl: LoadingController,
              public alertController : AlertController,
              public validator : ValidatorProvider,public authentication : AuthenticationProvider,public translateService: TranslateService)
  {
    this.mobileNumber = this.navParams.get('mobileNumber');
    this.password = this.navParams.get('confirmCode');
    this.id = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  regiseterUser(){
    if(this.validateForm()){
        let nickName = this.fName + "  " +this.lName;
        let params = {username : this.mobileNumber,password: this.password,nickname : nickName,
            email : this.email,firstname : this.fName,lastname : this.lName,identity_no : this.id,
            mobile : this.mobileNumber};
        this.webService.registerUser(params,false,
            ()=>{
                this.loadingController = this.loadingCtrl.create({
                    content: 'Please wait...'
                });
                this.loadingController.present();
            },()=>{
                this.loadingController.dismiss();
            },(response)=>{
                console.log(response);
                if (response['code'] == '200'){
                    let authenticateResult = this.authentication.authenticateUser(response);
                    if (authenticateResult){
                        this.webService.loginWithUserID(false,
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



                }else if(response['code'] == '305'){

                    this.translateService.get('serverError').subscribe(
                        title => {
                            this.translateService.get('register.duplicatedID').subscribe(
                                btn => {
                                    this.dupicatedIDAlert = this.alertController.create({
                                        title: '',
                                        subTitle: 'Duplicated Identity Number',
                                        buttons: ['Dismiss']
                                    });
                                    this.dupicatedIDAlert.present();
                                }
                            )
                        }
                    )


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
  }

  validateForm(){
    if(!this.validator.validateName(this.fName)){
        this.wrongFieldAlert = this.alertController.create({
            title: '',
            subTitle: 'Enter Valid First Name',
            buttons: ['Dismiss']
        });
        this.wrongFieldAlert.present();
        return false;
    }if(!this.validator.validateName(this.lName)) {
          this.wrongFieldAlert = this.alertController.create({
              title: '',
              subTitle: 'Enter Valid Last Name',
              buttons: ['Dismiss']
          });
          this.wrongFieldAlert.present();
          return false;
      }
    if(!this.validator.validateMail(this.email)){
        this.wrongFieldAlert = this.alertController.create({
            title: '',
            subTitle: 'Enter Valid Mail',
            buttons: ['Dismiss']
        });
        this.wrongFieldAlert.present();
      return false;
    }
    return true;
  }

}
