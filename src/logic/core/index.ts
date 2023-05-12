import Autenticacao from "../firebase/auth/Autenticacao";
import ServicosFinancas from "./financas/ServicosFinancas";

/**
 * classe responsavel por exibir todas as classe que fazem algo em nossa aplicação
 * forma mais prática de navegarmos pelas nossas funções
 */
class Servicos {
    get financas() { return ServicosFinancas }
    get autenticacao() { return Autenticacao }
}

const servicos = new Servicos()
export default servicos