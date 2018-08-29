import { Component } from '@angular/core';
import {Alert, AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {WebServiceProvider} from "../../providers/WebService/WebService";
import { Storage } from '@ionic/storage';
import { HomePage } from "../home/home";
import { TranslateService } from '@ngx-translate/core';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  viewProviders: [WebServiceProvider,LoadingController,AlertController]

})
export class LoginPage {

  userName : string;
  password : string;
  loadingController : Loading;
  serverFailAlert : Alert;
  networkFailAlert : Alert;
  unValidField : Alert;
  unValidLoginData : Alert;

    constructor(public navCtrl: NavController, public navParams: NavParams
                ,public alertController : AlertController,public loadingCtrl : LoadingController
                ,public storage : Storage,public translateService: TranslateService,public networkManager : WebServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  validateForm(){
        if (this.userName == undefined){
            this.unValidField = this.alertController.create({
                title: '',
                subTitle: 'Wrong Phone Number',
                buttons: ['Dismiss']
            });
            this.unValidField.present();
            return false;
        }else if(this.password == undefined){
            this.unValidField = this.alertController.create({
                title: '',
                subTitle: 'Wrong Password',
                buttons: ['Dismiss']
            });
            this.unValidField.present();
          return false;
        }

        return true;
  }

  login(){
      if(this.validateForm()){

          let params = {username:this.userName,password:this.password};
          this.networkManager.loginWithUserNameAndPasword(params,false,
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
                  if (response['code'] == '200'){
                      this.storage.set('userID',response['user_id']);
                      this.storage.set('SID',response['session_token']);
                      this.navCtrl.push(HomePage);
                  }else{

                      this.translateService.get('login.wrongUserNameOrPass').subscribe(
                          title => {
                              this.translateService.get('confirm').subscribe(
                                  btn => {
                                      this.unValidLoginData = this.alertController.create({
                                          title: '',
                                          subTitle: title,
                                          buttons: [btn]
                                      });
                                      this.unValidLoginData.present();                                }
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

}
