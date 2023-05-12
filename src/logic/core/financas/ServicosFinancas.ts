import Colecao from "@/logic/firebase/db/Colecao";
import Usuario from "../usuario/Usuario";
import Transacao from "./Transacao";

class ServicosFinancas {
    private _colecao = Colecao

    /**
     * funcao que aplica o salvamento da colecao
     * @param transacao transacao que desejo passa
     * @param usuario usuario que esta realizando a transação
     * @returns retorna o response da função
     */
    async salvar(transacao: Transacao, usuario: Usuario) {
        return this._colecao.salvar(
            `financas/${usuario.email}/transacoes`,
            transacao
        )
    }
    
    /**
     * 
     * @param transacao transação que desejo excluir
     * @param usuario usuario da transação
     * @returns 
     */
    async excluir(transacao: Transacao, usuario: Usuario) {
        return this._colecao.excluir(
            `financas/${usuario.email}/transacoes`,
            transacao.id
        )
    }

    /**
     * 
     * @param usuario usuario que desejamos consultas
     * @returns transações de um usuario ordenadas por data de forma decrescente
     */
    async consultar(usuario: Usuario) {
        return this._colecao.consultar(
            `financas/${usuario.email}/transacoes`,
            'data', 'desc'
        )
    }
}

export default new ServicosFinancas();