import servicos from '@/logic/core';
import Transacao from '@/logic/core/financas/Transacao';
import { useContext, useEffect, useState } from 'react';
import AutenticacaoContext from '../contexts/AutenticacaoContext';

export default function useTransacoes() {
    const { usuario } = useContext(AutenticacaoContext)
    const [transacoes, setTransacoes] = useState<Transacao[]>([])
    const [transacao, setTransacao] = useState<Transacao | null>(null)

    useEffect(() => {
        buscarTransacoes()
    }, [])

    // futuramente usada pelo firebase
    async function buscarTransacoes() {
        if(!usuario) return;

        const getTransacoes = await servicos.financas.consultar(usuario);
        setTransacoes(getTransacoes)
    }

    async function salvar(transacao: Transacao) {

        if (!usuario) return;
        // salvando no firebase a transação feita
        await servicos.financas.salvar(transacao, usuario)
        setTransacao(null)

        // atualizando lista de transações
        await buscarTransacoes()
    }
    
    async function excluir(transacao: Transacao) {
        if(!usuario) return;
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
        transacoes,
        transacao,
        salvar,
        excluir,
        selecionar,
        cancelar,
    }
}