import { Usuario } from "./Usuario";

export class Conversa{
    id: number;
    mensagem:string;
    usuarioDestino: Usuario;
    usuarioOrigem: Usuario;

    constructor(){
        this.usuarioDestino = new Usuario();
        this.usuarioOrigem = new Usuario();
    }
 }