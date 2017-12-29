import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContatoPage } from './contato';

@NgModule({
  declarations: [
    ContatoPage
  
  ],exports:[
    ContatoPage
  
  ],imports: [
    IonicPageModule.forChild(ContatoPage),
  
  ],
  providers:[
  ]
})
export class ContatoPageModule {}
