import Pagina from "../template/Pagina";
import Cabecalho from "./cabecalho";
import Destaque from "./destaque";
import Rodape from "./rodape";
import Vantagens from "./vantagens";

export default function Landing() {
    return (
        <Pagina externa>
            <Cabecalho />
            <Destaque />
            <Vantagens />
            <Rodape />
        </Pagina>
    )
}