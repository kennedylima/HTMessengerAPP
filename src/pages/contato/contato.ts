import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Usuario } from '../model/Usuario';

import { ContatoProvider } from './../../providers/contato/contato';

/**
 * Generated class for the ContatoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contato',
  templateUrl: 'contato.html',
})
export class ContatoPage {
  contatos: Usuario[] ; 
  usuario: Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, private contatoProvider: ContatoProvider) {
    
    if(this.contatoProvider.getContatoDestino() != undefined){
      this.navCtrl.push('ConversaPage',this.contatoProvider.getContatoDestino());
    }

    this.contatoProvider.getContatos().subscribe(contatos => this.contatos = contatos);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContatoPage');
  }

  abrirConversa(contato:Usuario){    
    this.navCtrl.push('ConversaPage',contato);
  }

}
