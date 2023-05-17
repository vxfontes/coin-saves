import servicos from '@/logic/core';
import Transacao from '@/logic/core/financas/Transacao';
import { useCallback, useContext, useEffect, useState } from 'react';
import AutenticacaoContext from '../contexts/AutenticacaoContext';

export type TipoExibicao = "lista" | "grade"

export default function useTransacoes() {
    const { usuario } = useContext(AutenticacaoContext)
    const [data, setData] = useState<Date>(new Date())
    const [tipoExibicao, setTipoExibicao] = useState<TipoExibicao>("lista") 
    const [transacoes, setTransacoes] = useState<Transacao[]>([])
    const [transacoesInvest, setTransacoesInvest] = useState<Transacao[]>([])
    const [transacao, setTransacao] = useState<Transacao | null>(null)

    // função depende do usuario, então essa função so muda se o usuario mudar (callback)
    const buscarTransacoes = useCallback(async function () {
        if(!usuario) return
        const transacoes = await servicos.financas.consultarPorMes(usuario, data)
        const transacoes2 = await servicos.financas.consultar(usuario)
        setTransacoes(transacoes)
        setTransacoesInvest(transacoes2)
    }, [usuario, data])

    // consertando useeffect
    useEffect(() => {
        buscarTransacoes()
    }, [buscarTransacoes, data])

    async function salvar(transacao: Transacao) {

        if (!usuario) return;
        // salvando no firebase a transação feita
        await servicos.financas.salvar(transacao, usuario)
        setTransacao(null)

        // atualizando lista de transações
        await buscarTransacoes()
    }

    async function excluir(transacao: Transacao) {
        if (!usuario) return;
        await servicos.financas.excluir(transacao, usuario)
        setTransacao(null)
        await buscarTransacoes()
    }

    function selecionar(transacao: Transacao) {
        setTransacao(transacao)
    }

    function cancelar() {
        setTransacao(null)
    }

    return {
        data,
        tipoExibicao,
        transacoes,
        transacao,
        transacoesInvest,
        salvar,
        excluir,
        selecionar,
        cancelar,
        alterarData: setData,
        alterarExibicao: setTipoExibicao
    }
}