import Autenticacao, { CancelarMonitoramento, MonitorarUsuario } from "@/logic/firebase/auth/Autenticacao"
import Colecao from "@/logic/firebase/db/Colecao"
import Usuario from "./Usuario"

class ServicosUsuario {
    private _autenticacao = Autenticacao;
    private _colecao = Colecao

    monitorarAutenticacao(observador: MonitorarUsuario): CancelarMonitoramento {
        return this._autenticacao.monitorar(async usuario => {
            observador(usuario ? {
                ...usuario,
                ...await this.consultar(usuario.email)
            } : null)
        })
    }

    /**
     * salvar usuario no banco na primeira vez que ele finalizar o login
     * @returns usuario default
     */
    async loginGoogle(): Promise<Usuario | null> {
        const usuario = await this._autenticacao.loginGoogle()
        if (!usuario) return null

        // buscar usuario por id 
        let usuarioDoBanco = await this.consultar(usuario.email) // se existe, retorna usuario e usuario do banco
        if (!usuarioDoBanco) usuarioDoBanco = await this.salvar(usuario) // se não existirr, salva o usuario e dps retorna

        return { ...usuario, ...usuarioDoBanco }
    }

    logout(): Promise<void> {
        return this._autenticacao.logout()
    }

    async salvar(usuario: Usuario) {
        return await this._colecao.salvar(
            'usuarios', usuario, usuario.email
        )
    }

    async consultar(email: string) {
        return await this._colecao.consultarPorId(
            'usuarios', email
        )
    }
}

export default new ServicosUsuario();