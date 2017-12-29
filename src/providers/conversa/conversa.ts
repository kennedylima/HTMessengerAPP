import { LoginProvider } from './../login/login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conversa } from '../../pages/model/Conversa';
import { Usuario } from '../../pages/model/Usuario';

/*
  Generated class for the ConversaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConversaProvider {
  request: any;
  error: any;
  usuarioOrigem:Usuario;

  constructor(public http: HttpClient, private loginProvider:LoginProvider) {  }

  salvar(conversa:Conversa){     
    this.http.post("https://htmessenger.herokuapp.com/conversa", conversa, { headers:{ 'Content-Type': 'application/json' } })
      .toPromise()
        .then(this.request)
        .catch(error => console.log(this.error));
  }

  getConversa( idUsuarioDestino ){
    this.usuarioOrigem = this.loginProvider.getUsuarioOrigem();
    return this.http.get("https://htmessenger.herokuapp.com/conversa/"+ this.usuarioOrigem.id+"/"+idUsuarioDestino)
    .map(dados => <Conversa[]>dados);
  }

  

}