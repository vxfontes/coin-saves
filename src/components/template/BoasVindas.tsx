// https://unicode-table.com/en/1F44B/
import { useContext } from 'react'

export default function BoasVindas() {
    const usuario = { nome: 'Lindinh@' };

    return (
        <div className={`text-3xl font-black`}>
            Olá{' '}
            <span className="hidden sm:inline">
                {usuario?.nome?.split(' ')[0]}
            </span>{' '}
            👋
        </div>
    )
}