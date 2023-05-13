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

    /**
     * funcao assincrona (por isso retorna um promise)
     * @returns retorna ou um usuario ou nada
     */
    async loginGoogle(): Promise<Usuario | null> {
        // fara a autenticacao do google em um popup e passaremos a nossa autenticacao e quem sera o provedor, utilizando 
        // uma classe feita para isso
        const resposta = await signInWithPopup(this._auth, new GoogleAuthProvider());
        // pega o usuario autenticado e o idToken e o nome e o email e o foto e o id e o email e o nome e o id  
        // se a resposta for bem concedida, recebemos um usuario da resposta e ja o convertemos
        return this.converterParaUsuario(resposta.user)
    }

    // funcao assincrona (por isso retorna um promise) que nao retorna nada, utilizando apenas uma 
    // função pronta e passando nossa autenticacao
    async logout(): Promise<void> {
        await signOut(this._auth)
    }

    /**
     * precisamos observar o usuario para notificar a aplicacao caso haja alguma coisa na autenticação (login ou reload automatico)
     * @param notificar notificar: nome da funcao e monitorarusuaio: tipo da funcao que sera parametro
     * @returns uma funcao void -> cancelarmonitoramento: retorno da funcao
     */
    monitorar(notificar: MonitorarUsuario): CancelarMonitoramento {

        // se o usuario estiver disponivel / existir, entao retornaremos um usuario
        return onIdTokenChanged(this._auth, async (usuarioFirebase) => {
            const usuario = this.converterParaUsuario(usuarioFirebase)
            notificar(usuario)
        })
    }


    /**
     * converterá o usuario firebase para o usuario que criamos na interface
     * @param usuarioFirebase usuario recebido do firebase
     * @returns usuario que criamos a interface
     */
    private converterParaUsuario(usuarioFirebase: User | null): Usuario | null {

        // se existir um usuario e se ele tiver email
        if (!usuarioFirebase?.email) return null;

        // alternativa para caso vim nulo, pois o typescript nao aceita
        const nomeAlternativo = usuarioFirebase.email!.split('@')[0]

        return {
            id: usuarioFirebase.uid,
            nome: usuarioFirebase.displayName ?? nomeAlternativo,
            email: usuarioFirebase.email,
            avatar: usuarioFirebase.photoURL ?? 'https://source.unsplash.com/random/100x100/?abstract'
        }
    }

}

export default new Autenticacao();