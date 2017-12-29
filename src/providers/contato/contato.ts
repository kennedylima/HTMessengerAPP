import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Usuario } from '../../pages/model/Usuario';
/*
  Generated class for the ContatoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContatoProvider {

  contatoDestino:Usuario;

  constructor(public http: HttpClient) {
    console.log('Hello ContatoProvider Provider');
  }


  getContatos() {    
    return this.http.get("https://htmessenger.herokuapp.com/usuario")
      .map(dados => <Usuario[]> dados);
  }

  setContatoDestino(contato){
    this.contatoDestino = contato;
  }
  
  getContatoDestino(){
    return this.contatoDestino;
  }
  
}
