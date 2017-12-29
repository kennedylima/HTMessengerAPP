import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../pages/model/Usuario';
import { NavController } from 'ionic-angular';



/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
  constructor(public http: HttpClient, private sqlite:SQLite) { console.log("Construindo login provider");}

  usuario:Usuario;
  usuarios: Usuario[] = [];
  
  autenticar(usuario: Usuario, navCtrl: NavController, lembrarMeuUsuario:Boolean){

    this.http.post("https://htmessenger.herokuapp.com/usuario/autenticar", usuario, { headers:{ 'Content-Type': 'application/json' } })
    .toPromise()
      .then(data => {    

        this.setUsuarioOrigem(<Usuario> data);
        this.salvarUsuario(lembrarMeuUsuario);
        this.abrirTelaDeContato( navCtrl);
       

      }).catch( error => alert("Usuario e/ou Senha inválidos"));
  }


  salvarUsuario(lembrarMeuUsuario:Boolean){

    if(lembrarMeuUsuario){
     
      console.log(this.getUsuarioOrigem());
      this.sqlite.create({name: "htmessenger.db", location: "default"}).then((db: SQLiteObject) => {
       
          db.executeSql('INSERT INTO usuario (id,nome ,login, senha) VALUES(?,?,?,?) ',[this.getUsuarioOrigem().id,this.getUsuarioOrigem().nome, this.getUsuarioOrigem().login,this.getUsuarioOrigem().senha])
          .then(() => console.log('Salvo com sucesso'))
          .catch(e => console.log(e));
      }, (error) => {
        console.log("ERROR: ", error);
      });

    }else {
      this.removerUsuarioSalvo();
    }
  }

  abrirTelaDeContatoSeOUsuarioEstiverSalvo( navCtrl: NavController ){
    this.sqlite.create({name: "htmessenger.db", location: "default"}).then((db: SQLiteObject) => {
      
         db.executeSql('SELECT * FROM usuario WHERE id=? ',[1])
         .then(
           (data) => { 
            for (var _i = 0; _i < data.rows.item.length; _i++) {
              this.usuarios.push(data.rows.item(_i));
            }  
             this.setUsuarioOrigem(data.rows.item(0));
             this.abrirTelaDeContato( navCtrl);
            }
         )
         .catch(e => console.log(e));
         
    }, (error) => {
       console.log("ERROR: ", error);
     });
  }
  
  removerUsuarioSalvo(){
    this.sqlite.create({name: "htmessenger.db", location: "default"}).then((db: SQLiteObject) => {
      
         db.executeSql('DELETE FROM usuario WHERE id=? ',[this.getUsuarioOrigem().id])
         .then(
           (data) => { 
             console.log("Usuario removido com sucesso !");
            }
         )
         .catch(e => console.log(e));
         
    }, (error) => {
       console.log("ERROR: ", error);
     });
     
  }

  abrirTelaDeContato(navCtrl : NavController){
    if(this.getUsuarioOrigem() != undefined){ 
      navCtrl.push('ContatoPage', this.getUsuarioOrigem());
    } 
  }

  setUsuarioOrigem(usuario){
    console.log(usuario);
    this.usuario = usuario; 
  }

  getUsuarioOrigem(){
    return this.usuario;
  }
}

