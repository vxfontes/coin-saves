import Usuario from "@/data/constants/UsuarioFalso";

export default function BoasVindas() {

    return (
        <div className={`text-3xl font-black`}>
            Olá{' '}
            <span className="hidden sm:inline">
                {Usuario?.nome?.split(' ')[0]}
            </span>{' '}
            👋
        </div>
    )
}