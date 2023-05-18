import { TipoTransacao } from '@/logic/core/financas/TipoTransacao';
import Transacao from '@/logic/core/financas/Transacao';
import { IconArrowsDoubleSwNe, IconCash, IconCreditCard, IconMoneybag, IconPigMoney } from '@tabler/icons-react';
import React from 'react';
import ResumoItem from './ResumoItem';

interface ResumoProps {
    transacoes: Transacao[]
    transacoesInvest: Transacao[]
    className?: string
}

export default function Resumo(props: ResumoProps) {
    const totalizar = (total: number, r: Transacao) => total + r.valor

    const receitas = props.transacoes
        .filter((r) => r.tipo === TipoTransacao.RECEITA)
        .reduce(totalizar, 0)

    const despesas = props.transacoes
        .filter((r) => r.tipo === TipoTransacao.DESPESA)
        .reduce(totalizar, 0)

    const investimento = props.transacoes
        .filter((r) => r.tipo === TipoTransacao.INVESTIMENTO)
        .reduce(totalizar, 0)

    const reserva = props.transacoes
        .filter((r) => r.tipo === TipoTransacao.RESERVA)
        .reduce(totalizar, 0)

    const total = receitas - despesas - investimento - reserva;

    const investimentoTotal = props.transacoesInvest
        .filter((r) => r.tipo === TipoTransacao.INVESTIMENTO)
        .reduce(totalizar, 0)

    const reservaTotal = props.transacoesInvest
        .filter((r) => r.tipo === TipoTransacao.RESERVA)
        .reduce(totalizar, 0)

    const verificarColunas = () => {
        if (investimentoTotal === 0 && reservaTotal !== 0) {
            return 'md:grid-cols-3';
        } else if (investimentoTotal !== 0 && reservaTotal === 0) {
            return 'md:grid-cols-3';
        } else {
            return 'md:grid-cols-2';
        }
    };

    const AllDataBaseValues = () => (
        <>
            <ResumoItem
                titulo='Receitas'
                valor={receitas}
                icone={<IconCash />}
                iconeClassName={`text-green-500 w-10 sm:w-12`}
            />
            <ResumoItem
                titulo='Despesas'
                valor={despesas}
                icone={<IconCreditCard />}
                iconeClassName={`text-red-500 w-10 sm:w-12`}
            />
            {investimentoTotal !== 0 && (
                <ResumoItem
                    titulo='Investimentos'
                    valor={investimentoTotal}
                    icone={<IconPigMoney />}
                    iconeClassName={`text-yellow-500 w-10 sm:w-12`}
                    valorClassName={'text-yellow-500'}
                />
            )}
            {reservaTotal !== 0 && (
                <ResumoItem
                    titulo='Reserva de emergência'
                    valor={reservaTotal}
                    icone={<IconMoneybag />}
                    iconeClassName={`text-yellow-500 w-10 sm:w-12`}
                    valorClassName={'text-yellow-500'}
                />
            )}
        </>
    )

    const TotalValue = () => (
        <ResumoItem
            titulo='Total'
            valor={total}
            icone={<IconArrowsDoubleSwNe />}
            iconeClassName={`${total > 0 ? 'text-green-500' : total < 0 ? 'text-red-500' : ''} w-10 sm:w-12`}
            valorClassName={total > 0 ? 'text-green-500' : total < 0 ? 'text-red-500' : ''}
        />
    )

    return (
        <>
            <div className={`${investimentoTotal === 0 && reservaTotal === 0 ? 'grid grid-cols-1 md:grid-cols-3 gap-4' : `grid gap-4`}`}>

                {investimentoTotal !== 0 || reservaTotal !== 0 ? (
                    <>
                        <div className={`
                            ${verificarColunas()} grid gap-4 grid-cols-1
                        `}>
                            <AllDataBaseValues />
                        </div>

                        <div className="col-span-1">
                            <TotalValue />
                        </div>
                    </>
                ) : (
                    <>
                        <AllDataBaseValues />
                        <TotalValue />
                    </>
                )}

            </div>
        </>
    )
}