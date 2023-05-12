interface AreaProps {
    children: any
    className?: string
}

// limitando a pagina para que ela tenha um tamanho maximo de 1200px
export default function Area(props: AreaProps) {
    return (
        <div className={`
            flex justify-center w-full
            ${props.className ?? ''}
        `}>
            <div className={`
                px-7 xl:px-0 
                w-full xl:w-[1200px]
            `}>
                {props.children}
            </div>
        </div>
    )
}