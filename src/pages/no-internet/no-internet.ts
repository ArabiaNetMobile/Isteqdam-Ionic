import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the NoInternetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-no-internet',
  templateUrl: 'no-internet.html',
})
export class NoInternetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public translateService: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoInternetPage');
    this.showNetworkError();
  }

    showNetworkError(){
        this.translateService.get('block.blockMsg').subscribe(
            title => {
                this.translateService.get('confirm').subscribe(
                    btn => {
                        const alert = this.alertCtrl.create({
                            title: '',
                            subTitle: title,
                            buttons: [btn]
                        });
                        alert.present();
                    }
                )
            }
        )

    }

}
