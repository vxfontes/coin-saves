import ServicosFinancas from "./financas/ServicosFinancas";
import ServicosUsuario from "./usuario/ServicosUsuario";

/**
 * classe responsavel por exibir todas as classe que fazem algo em nossa aplicação
 * forma mais prática de navegarmos pelas nossas funções
 */
class Servicos {
    get financas() { return ServicosFinancas }
    get usuario() { return ServicosUsuario }
}

const servicos = new Servicos()
export default servicos