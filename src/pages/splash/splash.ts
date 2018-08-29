import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {EnterMobilePage} from "../enter-mobile/enter-mobile";
import {BlockPage} from "../block/block";
import {HomePage} from "../home/home";
import {LoginPage} from "../login/login";
import {NoInternetPage} from "../no-internet/no-internet";
import { Storage } from "@ionic/storage";
import { WebServiceProvider } from "../../providers/WebService/WebService";
import { AuthenticationProvider } from "../../providers/authentication/authentication";
import {ValidatorProvider} from "../../providers/validator/validator";

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
  viewProviders: [WebServiceProvider,AuthenticationProvider],
})
export class SplashPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,
              public webService : WebServiceProvider,public authentication : AuthenticationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
    this.getStartScreen();
  }

    getStartScreen(){
        this.storage.get('SID').then((val)=>{
            console.log('SID' + val);
            if(val == null){
                this.navCtrl.push(EnterMobilePage);
            }else{

                this.webService.isUserLogged(false,()=>{},()=>{},
                    (response)=>{
                        let authorizationResult = this.authentication.authorizeUser(response);
                        console.log(authorizationResult);
                        if (authorizationResult == -1){
                            this.navCtrl.push(BlockPage);
                        }else if(authorizationResult == 0){
                            this.navCtrl.push(LoginPage);
                        }else{
                            this.navCtrl.push(HomePage);
                        }
                    },()=>{
                        this.navCtrl.push(NoInternetPage);
                    });
            }
        });
    }

}
