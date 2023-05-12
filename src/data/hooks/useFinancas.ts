import Transacao from '@/logic/core/financas/Transacao'
import { useEffect, useState } from 'react'
import transacoesFalsas from '../constants/TransacoesFalsas'

export default function useTransacoes() {
    const [transacoes, setTransacoes] = useState<Transacao[]>(transacoesFalsas)
    const [transacao, setTransacao] = useState<Transacao | null>(null)

    useEffect(buscarTransacoes, [])

    // futuramente usada pelo firebase
    function buscarTransacoes() {
        setTransacoes(transacoesFalsas)
    }

    function salvar(transacao: Transacao) {
        const outras = transacoes.filter(t => t.id !== transacao.id)

        setTransacoes([
            ...outras,
            { ...transacao, id: transacao.id ?? crypto.randomUUID() },
        ])

        setTransacao(null)
    }

    function excluir(transacao: Transacao) {
        const outras = transacoes.filter(t => t.id !== transacao.id)

        setTransacoes(outras)
        setTransacao(null)
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