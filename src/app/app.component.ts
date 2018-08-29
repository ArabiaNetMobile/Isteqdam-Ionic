import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { WebServiceProvider } from "../providers/WebService/WebService";
import { AuthenticationProvider } from "../providers/authentication/authentication";

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { EnterMobilePage } from '../pages/enter-mobile/enter-mobile';
import { Storage } from '@ionic/storage';
import { LoginPage } from "../pages/login/login";
import { NoInternetPage } from "../pages/no-internet/no-internet";
import { BlockPage } from "../pages/block/block";
import { SplashPage } from "../pages/splash/splash";
import {RegisterPage} from "../pages/register/register";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SplashPage;
  translate : TranslateService;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              translate: TranslateService,public storage : Storage,
              public webService : WebServiceProvider,public authentication : AuthenticationProvider) {
    this.initializeApp();
    this.translate = translate;
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.translate.setDefaultLang('en');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
