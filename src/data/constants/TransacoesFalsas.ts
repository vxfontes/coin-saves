import { TipoTransacao } from "@/logic/core/financas/TipoTransacao";
import Transacao from "@/logic/core/financas/Transacao";

const transacoesFalsas: Transacao[] = [
    {
        id: crypto.randomUUID(),
        descricao: 'Salário',
        data: new Date(2023, 4, 1),
        valor: 7123.34,
        tipo: TipoTransacao.RECEITA,
    },
    {
        id: crypto.randomUUID(),
        descricao: 'Conta de Luz',
        valor: 320.00,
        data: new Date(2023, 4, 3),
        tipo: TipoTransacao.DESPESA,
    },
    {
        id: crypto.randomUUID(),
        descricao: 'Aluguel + Cond.',
        valor: 1817.59,
        data: new Date(2023, 4, 3),
        tipo: TipoTransacao.DESPESA,
    },
    {
        id: crypto.randomUUID(),
        descricao: 'Cartão de Crédito',
        valor: 2200.00,
        data: new Date(2023, 4, 10),
        tipo: TipoTransacao.DESPESA,
    },
    {
        id: crypto.randomUUID(),
        descricao: 'Conta de Água',
        valor: 174.35,
        data: new Date(2023, 4, 8),
        tipo: TipoTransacao.DESPESA,
    },
    {
        id: crypto.randomUUID(),
        descricao: 'Mensalidade MBA',
        valor: 750.00,
        data: new Date(2023, 4, 2),
        tipo: TipoTransacao.DESPESA,
    },
    
    {
        id: crypto.randomUUID(),
        descricao: 'Investimentos',
        data: new Date(2023, 4, 1),
        valor: 2123.34,
        tipo: TipoTransacao.RECEITA,
    },
]

export default transacoesFalsas