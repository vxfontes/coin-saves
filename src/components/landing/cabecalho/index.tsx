import Area from "../comum/Area"
import Logo from "../comum/Logo";
import Menu from "./Menu";

const Cabecalho = () => {
    return (
        <Area className={`bg-black h-20`}>
            <div className={`flex justify-between items-center h-20`}>
                <Logo />
                <Menu />
            </div>
        </Area>
    );
}

export default Cabecalho;