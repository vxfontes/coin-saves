import useTransacoes from "@/data/hooks/useFinancas";
import { transacaoVazia } from "@/logic/core/financas/Transacao";
import { IconPlus } from '@tabler/icons-react';
import Cabecalho from "../template/Cabecalho";
import Conteudo from "../template/Conteudo";
import NaoEncontrado from "../template/NaoEncontrado";
import Formulario from "./Formulario";
import Lista from "./Lista";
import Resumo from "./Resumo";

const Financas = () => {
    // hook personalizada
    const {
        transacoes, transacao, selecionar, salvar, excluir, cancelar
    } = useTransacoes()


    return (
        <div>
            <Cabecalho />
            <Conteudo className="gap-5">
                <Resumo transacoes={transacoes} />

                <div>
                    <button
                        className='btn bg-blue-500'
                        onClick={() => selecionar(transacaoVazia)}
                    >
                        <IconPlus />
                        <span>Nova Transação</span>
                    </button>
                </div>

                
                {transacao ? (
                    <Formulario
                        transacao={transacao}
                        salvar={salvar}
                        excluir={excluir}
                        cancelar={cancelar}
                    />
                ) : transacoes.length ? (
                    <Lista
                        transacoes={transacoes}
                        selecionarTransacao={selecionar}
                    />
                ) : (
                    <NaoEncontrado>
                        Nenhuma transação encontrada.
                    </NaoEncontrado>
                )}
            </Conteudo>
        </div>
    );
}

export default Financas;