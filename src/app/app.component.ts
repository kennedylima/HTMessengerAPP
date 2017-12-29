import { LocalNotifications } from '@ionic-native/local-notifications';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


import { TabsPage } from '../pages/tabs/tabs';
import { ContatoProvider } from '../providers/contato/contato';
import { Usuario } from '../pages/model/Usuario';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  usuario: Usuario = new Usuario();
  usuarios: Usuario[];

  constructor( private sqlLite: SQLite, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private localNotifications:LocalNotifications, private contatoProvider: ContatoProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      this.sqlLite.create({
        name: 'htmessenger.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
                
          db.executeSql('CREATE TABLE IF NOT EXISTS usuario ( id INTEGER , nome TEXT not null, login TEXT not null, senha TEXT not null )', {})
            .then(() => console.log('Tabela Usuario criada com sucesso'))
            .catch(e => console.log("Erro a criar tabela Usuario: "+ e));
      
        })
        .catch(e => console.log(e));


      this.localNotifications.on('click', (notification, state) => {
        this.contatoProvider.setContatoDestino(notification.data);
        
      });

    });   
  }

}
