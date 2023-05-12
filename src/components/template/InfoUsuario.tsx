import Usuario from "@/data/constants/UsuarioFalso";

export default function InfoUsuario() {

    return (
        <div className='flex items-center gap-3 cursor-pointer'>
            <div className='flex flex-col select-none text-right'>
                <span className='text-sm font-bold text-zinc-200'>
                    {Usuario?.nome}
                </span>
                <span className='text-xs text-zinc-400'>
                    {Usuario?.email}
                </span>
            </div>
        </div>
    )
}