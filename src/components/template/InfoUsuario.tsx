export default function InfoUsuario() {
    const usuario = { nome: 'ALOALO', email: '99@dsd.d' }

    return (
        <div className='flex items-center gap-3 cursor-pointer'>
            <div className='flex flex-col select-none text-right'>
                <span className='text-sm font-bold text-zinc-200'>
                    {usuario?.nome}
                </span>
                <span className='text-xs text-zinc-400'>
                    {usuario?.email}
                </span>
            </div>
        </div>
    )
}