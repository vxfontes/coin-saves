import Colecao from "@/logic/firebase/db/Colecao";
import Data from "@/logic/utils/Data";
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


    /**
     * 
     * @param usuario usuario que desejamos consultas
     * @param data data que ocorreu
     * @returns transações de um usuario ordenadas e por mês
     */
    async consultarPorMes(usuario: Usuario, data: Date) {
        const caminho = `financas/${usuario.email}/transacoes`
        return await this._colecao.consultarComFiltros(caminho, [
            { atributo: 'data', op: ">=", valor: Data.primeiroDia(data) },
            { atributo: 'data', op: "<=", valor: Data.ultimoDia(data) },
        ], 'data', 'desc')
    }
}

export default new ServicosFinancas();