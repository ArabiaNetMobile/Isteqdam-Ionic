import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the BlockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-block',
  templateUrl: 'block.html',
})
export class BlockPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public translateService: TranslateService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlockPage');
    this.showBlockAlert();
  }

  showBlockAlert(){
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
