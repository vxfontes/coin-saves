import Usuario from "@/logic/core/usuario/Usuario";
import { Auth, getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut, User } from 'firebase/auth'
import { app } from "../config/app";

// tipos para visualizar melhor as funcoes e parametros 
export type MonitorarUsuario = (usuario: Usuario | null) => void
export type CancelarMonitoramento = () => void


class Autenticacao {

    private _auth: Auth;
    // inicializando autenticação
    constructor() {
        this._auth = getAuth(app)
    }

    // funcao assincrona (por isso retorna um promise) que retorna ou um usuario ou nada
    async loginGoogle(): Promise<Usuario | null> {
        // fara a autenticacao do google em um popup e passaremos a nossa autenticacao e quem sera o provedor, utilizando 
        // uma classe feita para isso
        const resposta = await signInWithPopup(this._auth, new GoogleAuthProvider());

        // se a resposta for bem concedida, recebemos um usuario da resposta e ja o convertemos
        return this.converterParaUsuario(resposta.user)
    }

    // funcao assincrona (por isso retorna um promise) que nao retorna nada, utilizando apenas uma 
    // função pronta e passando nossa autenticacao
    async logout(): Promise<void> {
        await signOut(this._auth)
    }


    // monitoramento - precisamos observar o usuario para notificar a aplicacao caso haja alguma coisa
    // na autenticação (login ou reload automatico)
    // teremos uma funcao que recebe uma funcao como parametro e retorna uma funcao void

    // notificar: nome da funcao e monitorarusuaio: tipo da funcao que sera parametro
    // cancelarmonitoramento: retorno da funcao
    monitorar(notificar: MonitorarUsuario): CancelarMonitoramento {

        // se o usuario estiver disponivel / existir, entao retornaremos um usuario
        return onIdTokenChanged(this._auth, async (usuarioFirebase) => {
            const usuario = this.converterParaUsuario(usuarioFirebase)
            notificar(usuario)
        })
    }

    // funcao que converterá o usuario firebase para o usuario que criamos na interface
    private converterParaUsuario(usuarioFirebase: User | null): Usuario | null {

        // se existir um usuario e se ele tiver email
        if (!usuarioFirebase?.email) return null;

        // alternativa para caso vim nulo, pois o typescript nao aceita
        const nomeAlternativo = usuarioFirebase.email!.split('@')[0]

        return {
            id: usuarioFirebase.uid,
            nome: usuarioFirebase.displayName ?? nomeAlternativo,
            email: usuarioFirebase.email
        }
    }

}

export default new Autenticacao();