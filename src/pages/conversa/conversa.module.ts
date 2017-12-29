
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConversaPage } from './conversa';

import { LocalNotifications } from '@ionic-native/local-notifications';

@NgModule({
  
  providers:[
    LocalNotifications
  ],

  
  declarations: [
    ConversaPage,
  ],
  imports: [
    IonicPageModule.forChild(ConversaPage),
  ]
})
export class ConversaPageModule {}
