import Area from "../comum/Area";
import Slogan from "./Slogan";
import principal from "../../../assets/principal.jpg"
import ImagemResponsiva from "../comum/ImagemResponsiva";

// escondemos a imagem se o dispositivo por muito pequeno
// o pt-20 empurra o rodape para baixo, ficando sempre no footer da pagina
export default function Destaque() {
    return (
        <Area id="inicio" className="pt-20">
            <div className={`
                flex items-center justify-around
                h-[500px]
            `}>
                <Slogan />
                <ImagemResponsiva
                    imagem={principal}
                    className="rotate-3 hidden md:inline"
                />
            </div>
        </Area>
    )
}