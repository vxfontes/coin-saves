export default function Slogan() {
    function renderizarFrase() {
        return (
            <div
                className={`
                    flex flex-col items-center md:items-start text-4xl lg:text-6xl
                    text-white font-light
                `}
            >
                <div className="flex gap-2.5">
                    <div className={`relative`}>
                        <span
                            className={`
                            absolute bottom-1 left-0 w-full
                            border-b-8 border-purple-500
                            -rotate-2
                        `}
                        ></span>
                        <span className="relative">Melhor</span>
                    </div>
                    <div>maneira</div>
                </div>
                <div className="flex gap-2.5">
                    <span>de</span>
                    <span>organizar</span>
                </div>
                <div className="flex gap-2.5">
                    <span>seu</span>
                    <span
                        className={`
                        flex items-center p-1
                        relative text-black
                    `}
                    >
                        <span className="absolute -rotate-1 top-0.5 left-0 w-full h-5/6 bg-yellow-300 rounded-sm" />
                        <span className="relative rotate-2 z-20">dinheiro</span>
                    </span>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center gap-5">
            {renderizarFrase()}
            <div className="text-sm lg:text-lg font-thin text-zinc-500 text-center sm:text-left">
                Plataforma financeira que simplifica sua vida!
            </div>
        </div>
    )
}