import { BrowserModule } from '@angular/platform-browser';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { InternationalPhoneModule } from 'ng4-country-phone-select';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { EnterMobilePage } from '../pages/enter-mobile/enter-mobile';
import { ConfirmCodePage } from '../pages/confirm-code/confirm-code';
import { RegisterPage } from "../pages/register/register";
import { LoginPage } from "../pages/login/login";
import { NoInternetPage } from "../pages/no-internet/no-internet";
import { BlockPage } from "../pages/block/block";
import { SplashPage } from "../pages/splash/splash";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ValidatorProvider } from '../providers/validator/validator';
import { WebServiceProvider } from '../providers/WebService/WebService';
import { AuthenticationProvider } from '../providers/authentication/authentication';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    EnterMobilePage,
    ConfirmCodePage,
    RegisterPage,
    LoginPage,
    NoInternetPage,
    BlockPage,
    SplashPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    InternationalPhoneModule ,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: (HttpLoaderFactory),
              deps: [HttpClient]
          }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    EnterMobilePage,
    ConfirmCodePage,
    RegisterPage,
    LoginPage,
    NoInternetPage,
    BlockPage,
    SplashPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ValidatorProvider,
    WebServiceProvider,
    AuthenticationProvider,
    UniqueDeviceID,
    HTTP,

  ]
})


export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}