import transacoesFalsas from "@/data/constants/TransacoesFalsas";
import Transacao, { transacaoVazia } from "@/logic/core/financas/Transacao";
import { IconPlus } from '@tabler/icons-react';
import { useState } from "react";
import Cabecalho from "../template/Cabecalho";
import Conteudo from "../template/Conteudo";
import Formulario from "./Formulario";
import Lista from "./Lista";
import Resumo from "./Resumo";

const Financas = () => {
    const [transacoes, setTransacoes] = useState<Transacao[]>(transacoesFalsas);
    const [transacao, setTransacao] = useState<Transacao | null>(null);

    function Salvar(transacao: Transacao) {
        const outras = transacoes.filter(t => t.id !== transacao.id)

        setTransacoes([
            ...outras,
            {...transacao, id: transacao.id ?? crypto.randomUUID()},
        ])

        setTransacao(null)
    }

    function Excluir(transacao: Transacao) {
        const outras = transacoes.filter(t => t.id !== transacao.id)

        setTransacoes(outras)
        setTransacao(null)
    }

    return (
        <div>
            <Cabecalho />
            <Conteudo className="gap-5">
                <Resumo transacoes={transacoes} />

                <div>
                    <button
                        className='btn bg-blue-500'
                        onClick={() => setTransacao(transacaoVazia)}
                    >
                        <IconPlus />
                        <span>Nova Transação</span>
                    </button>
                </div>

                
                {transacao ? (
                    <Formulario transacao={transacao}
                        cancelar={() => setTransacao(null)}
                        salvar={Salvar} 
                        excluir={Excluir}/>
                ) : (
                    <Lista transacoes={transacoes} selecionarTransacao={setTransacao} />
                )}
            </Conteudo>
        </div>
    );
}

export default Financas;