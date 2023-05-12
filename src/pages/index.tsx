import Financas from "@/components/financas";
import Landing from "@/components/landing";
import Carregando from "@/components/template/Carregando";
import AutenticacaoContext from "@/data/contexts/AutenticacaoContext";
import { useContext } from "react";

export default function Home() {
    const { usuario, carregando } = useContext(AutenticacaoContext)

    // verificando se a aplicação esta ou não carregando
    if (carregando) return <Carregando />
    return usuario ? <Financas /> : <Landing />
}
