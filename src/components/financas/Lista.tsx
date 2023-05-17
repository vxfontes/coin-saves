import Transacao from "@/logic/core/financas/Transacao";
import Data from "@/logic/utils/Data";
import Dinheiro from "@/logic/utils/Dinheiro";
import { IconTrendingDown, IconTrendingUp, IconZoomMoney } from "@tabler/icons-react";

interface ListaProps {
    transacoes: Transacao[]
    selecionarTransacao?: (transacao: Transacao) => void
}

export default function Lista(props: ListaProps) {

    // redenrizar icone e suas devidas cores
    function renderizarTipo(transacao: Transacao) {
        return (
            <span className={`
                flex justify-center items-center 
                h-8 w-8 sm:w-10 sm:h-10 p-1.5 rounded-full
                ${transacao.tipo === 'receita' ? 'bg-green-500' : transacao.tipo === 'despesa' ? 'bg-red-500' : 'bg-yellow-500'}
            `}>
                {transacao.tipo === 'receita' ? <IconTrendingUp /> : transacao.tipo === 'despesa' ? <IconTrendingDown /> : <IconZoomMoney />}
            </span>
        )
    }


    // renderizar linha individual onde o indice faz com que as linhas impares tenham cores diferente das linhas pares
    function renderizarLinha(transacao: Transacao, indice: number) {
        return (
            <div key={transacao.id} className={`
                flex items-center gap-3 p-3 cursor-pointer
                ${indice % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-800'}
            `} onClick={() => props.selecionarTransacao?.(transacao)}>
                {renderizarTipo(transacao)}
                <span className="w-full md:w-1/2">{transacao.descricao}</span>
                <span className="hidden md:inline flex-1">{Data.ddmmyy.formatar(transacao.data)}</span>
                <span>{Dinheiro.formatar(transacao.valor)}</span>
            </div>       
        )
    }

    return (

        // formatacao da tabela
        <div className={`
            flex flex-col border border-zinc-700
            rounded-xl overflow-hidden
        `}>
            {/* renderizacao da linha */}
            {props.transacoes.map(renderizarLinha)} 
        </div>
    )
}