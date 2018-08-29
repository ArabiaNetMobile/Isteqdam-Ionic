import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmCodePage } from './confirm-code';

@NgModule({
  declarations: [
    ConfirmCodePage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmCodePage),
  ],
})
export class ConfirmCodePageModule {}
