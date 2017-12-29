import { LoginPage } from './../login/login';
import { LoginProvider } from './../../providers/login/login';
import { ConversaProvider } from './../../providers/conversa/conversa';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Usuario } from '../model/Usuario';
import { Conversa } from '../model/Conversa';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the ConversaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversa',
  templateUrl: 'conversa.html',
})
export class ConversaPage {
  idUsuarioOrigem: number;
  idUsuarioDestino: number;
  usuarioOrigem: Usuario;
  usuarioDestino: Usuario;
  conversas: Conversa[];
  conversa: Conversa = new Conversa();
  idUltimaConversa: number = 0;

  
  constructor(public navCtrl: NavController, public navParams: NavParams, private conversaProvider:ConversaProvider, private loginProvider: LoginProvider,private platform: Platform, private localNotifications:LocalNotifications) {
    this.usuarioDestino = navParams.data;
    this.usuarioOrigem = this.loginProvider.getUsuarioOrigem();

    if(this.usuarioOrigem == undefined){
      navCtrl.push(LoginPage);
    
    }else{
      
      this.idUsuarioDestino = this.usuarioDestino.id;
      this.idUsuarioOrigem = this.usuarioOrigem.id;
      
      this.conversaProvider.getConversa(this.usuarioDestino.id).subscribe(conversas => {
        this.conversas = conversas;  
        this.idUltimaConversa = this.conversas.length;  
        this.atualizarConversa();
      });

      this.conversa.usuarioDestino = this.usuarioDestino;
      this.conversa.usuarioOrigem = this.usuarioOrigem;
     
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversaPage');
  }

  salvar(){
    this.conversaProvider.salvar(this.conversa);
    this.conversas.push(this.conversa);
    this.conversa = new Conversa();
    this.conversa.mensagem = "";
    this.conversa.usuarioDestino = this.usuarioDestino;
    this.conversa.usuarioOrigem = this.usuarioOrigem;
  }

  atualizarConversa(){
    
    setInterval(() => {
      this.conversaProvider.getConversa(this.usuarioDestino.id).subscribe(conversas => {
        this.conversas = conversas;
        if(this.conversas.length != this.idUltimaConversa){
          this.idUltimaConversa = this.conversas.length;  
          this.notificarQueHaUmaNovaMensagem();
        }
      });
    },500);

  }


  notificarQueHaUmaNovaMensagem(){
    
    this.platform.ready().then(() => {

      if( this.conversas[this.idUltimaConversa -1].usuarioOrigem.id != this.usuarioOrigem.id ){
        this.localNotifications.schedule({
          id: 1,
          title: this.usuarioDestino.nome,
          text:  "escreveu: "+ this.conversas[this.idUltimaConversa -1].mensagem,
          data: this.usuarioDestino
        });
      }
      
    });
  }

}
