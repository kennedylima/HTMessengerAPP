import { LoginProvider } from './../../providers/login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../model/Usuario';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  lembrarMeuUsuario: Boolean = false;
  usuario:Usuario = new Usuario();
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private loginProvider: LoginProvider) {
    this.loginProvider.abrirTelaDeContatoSeOUsuarioEstiverSalvo(this.navCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  entrar(){
    this.loginProvider.autenticar(this.usuario, this.navCtrl, this.lembrarMeuUsuario);
  }
}
