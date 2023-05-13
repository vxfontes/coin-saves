import { ChildrenProps } from "@/logic/core/children"

interface ConteudoProps extends ChildrenProps {
    className?: string
}

export default function Conteudo(props: ConteudoProps) {
    return (
        <div className={`
            flex flex-col p-7
            ${props.className ?? ''}
        `}>
            {props.children}
        </div>
    )
}