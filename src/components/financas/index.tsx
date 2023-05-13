import useTransacoes, { TipoExibicao } from "@/data/hooks/useFinancas";
import { transacaoVazia } from "@/logic/core/financas/Transacao";
import { Button, SegmentedControl } from "@mantine/core";
import { IconLayoutGrid, IconList, IconPlus } from '@tabler/icons-react';
import Cabecalho from "../template/Cabecalho";
import CampoMesAno from "../template/CampoMesAno";
import Conteudo from "../template/Conteudo";
import NaoEncontrado from "../template/NaoEncontrado";
import Formulario from "./Formulario";
import Grade from "./Grade";
import Lista from "./Lista";
import Resumo from "./Resumo";

const Financas = () => {
    // hook personalizada
    const {
        transacoes, transacao, selecionar, salvar, excluir, cancelar, data, alterarData, alterarExibicao, tipoExibicao
    } = useTransacoes();


    function renderizarControles() {
        return (
            <div className="flex flex-col justify-end sm:flex-row sm:items-center">
                <div className="sm:w-2/5">
                    <CampoMesAno
                        data={data}
                        dataMudou={alterarData}
                    />
                </div>
                <div className="flex items-center gap-5 mt-5 sm:mt-0 sm:w-3/5 justify-between sm:justify-end">
                    <Button className="bg-blue-500" leftIcon={<IconPlus />} onClick={() => selecionar(transacaoVazia)}>
                        Nova transação
                    </Button>
                    <SegmentedControl
                        data={[
                            { label: <IconList />, value: 'lista' },
                            { label: <IconLayoutGrid />, value: 'grade' }
                        ]}
                        onChange={tipo => alterarExibicao(tipo as TipoExibicao)}
                    />
                </div>
            </div>

        )
    }

    function renderizarTransacoes() {
        const props = { transacoes, selecionarTransacao: selecionar }
        return tipoExibicao === 'lista'
            ? <Lista {...props} />
            : <Grade {...props} />
    }


    return (
        <div>
            <Cabecalho />
            <Conteudo className="gap-5">
                <Resumo transacoes={transacoes} />

                {renderizarControles()}

                {transacao ? (
                    <Formulario
                        transacao={transacao}
                        salvar={salvar}
                        excluir={excluir}
                        cancelar={cancelar}
                    />
                ) : transacoes.length ? (
                    renderizarTransacoes()
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