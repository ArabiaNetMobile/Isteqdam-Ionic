import { Component } from '@angular/core';
import {Alert, IonicPage, Loading, NavController, NavParams} from 'ionic-angular';
import { ValidatorProvider } from '../../providers/validator/validator';
import { WebServiceProvider } from "../../providers/WebService/WebService";
import { LoadingController} from "ionic-angular";
import { AlertController } from 'ionic-angular';
import { ConfirmCodePage } from "../confirm-code/confirm-code";
import { TranslateService } from '@ngx-translate/core';


/**
 * Generated class for the EnterMobilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enter-mobile',
  templateUrl: 'enter-mobile.html',
  viewProviders: [ValidatorProvider,WebServiceProvider,LoadingController,AlertController]
})
export class EnterMobilePage {

  phoneNumber : string = "";
  optimizedPhoneNumber : string = "";
  validator : ValidatorProvider;
  loadingController : Loading;
  networkManager : WebServiceProvider;
  alertController : AlertController;
  serverFailAlert : Alert;
  networkFailAlert : Alert;
  unValidPhoneAlert : Alert;


  constructor(public navCtrl: NavController, public navParams: NavParams,validator : ValidatorProvider,
              public loadingCtrl: LoadingController,networkManager : WebServiceProvider,alertController : AlertController,public translateService: TranslateService) {
    this.validator = validator;
    this.networkManager = networkManager;
    this.alertController = alertController;

  }


  ionViewDidLoad() {

  }



  confirmPhoneNumber(){


      this.optimizedPhoneNumber = this.phoneNumber;
      this.optimizedPhoneNumber = this.optimizedPhoneNumber.replace('+','00');


    if (this.validator.validatePhoneNumber(this.optimizedPhoneNumber)){

        let params = {mobile_num : this.optimizedPhoneNumber};
      this.networkManager.requestConfirmationCode(params,false,
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
          if (response['code'] == "200"){
            this.navCtrl.push(ConfirmCodePage,{token: response['token'],phoneNumber : this.optimizedPhoneNumber});
          }else{
              console.log(response['data']);
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

        this.translateService.get('enterMobile.wrongPhoneNumber').subscribe(
            title => {
                this.translateService.get('confirm').subscribe(
                    btn => {
                        this.unValidPhoneAlert = this.alertController.create({
                            title: '',
                            subTitle: title,
                            buttons: [btn]
                        });
                        this.unValidPhoneAlert.present();
                    }
                )
            }
        )



    }
  }

}


