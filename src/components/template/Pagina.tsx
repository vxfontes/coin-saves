interface PaginaProps {
    externa?: boolean;
    children: React.ReactNode;
    className?: string;
}

const Pagina = (props: PaginaProps) => {
    return (
        <div className={`
            flex flex-col min-h-screen 
            bg-gradient-to-r from-zinc-900 via-black to-zinc-900
            ${props.className ?? ''}
        `}>
            {props.children}
        </div>
    );
}

export default Pagina;