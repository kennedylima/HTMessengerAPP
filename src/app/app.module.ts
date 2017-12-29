import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SQLite } from '@ionic-native/sqlite';


import { LoginPageModule } from './../pages/login/login.module';
import { ConversaPageModule } from './../pages/conversa/conversa.module';
import { ContatoPageModule } from './../pages/contato/contato.module';
import { HttpClientModule } from '@angular/common/http';

import { ConversaProvider } from './../providers/conversa/conversa';
import { ContatoProvider } from './../providers/contato/contato';
import { LoginProvider } from './../providers/login/login';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoginPageModule,
    ContatoPageModule,
    ConversaPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    LoginProvider,
    ContatoProvider,
    ConversaProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
