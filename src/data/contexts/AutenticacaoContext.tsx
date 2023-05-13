import servicos from "@/logic/core"
import { ChildrenProps } from "@/logic/core/children"
import Usuario from "@/logic/core/usuario/Usuario"
import Autenticacao from "@/logic/firebase/auth/Autenticacao"
import { createContext, useEffect, useState } from "react"

// o que existira no nosso contexto
interface AutenticacaoProps {
    carregando: boolean
    usuario: Usuario | null
    loginGoogle: () => Promise<Usuario | null>
    logout: () => Promise<void>
    atualizarUsuario: (novoUsuario: Usuario) => Promise<void>
}

// criando contexto no estado inicial, inclusive carregando para verificar a autenticacao
const AutenticacaoContext = createContext<AutenticacaoProps>({
    carregando: true,
    usuario: null,
    loginGoogle: async () => null,
    logout: async () => {},
    atualizarUsuario: async () => {}
})

export default AutenticacaoContext;


/**
 * criaremos agora o contexto que sera uma tag que recebera as informacoes que queremos, envolvendo todo nosso componente
    envolveremos no componente pai, no nosso caso, sera o app.tsx
 * @param props 
 * @returns <AutenticacaoContext.Provider value={{...}} 
 */
export function AutenticacaoProvider (props: ChildrenProps) {
    const [carregando, setcarregando] = useState(true);
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    // recebe nossas classes com funcoes do firebase
    const autenticacao = Autenticacao;

    // precisamos que na inicializacao da classe, busquemos o usuario na nossa aplicação
    useEffect(() => {
        const cancelar = autenticacao.monitorar(function (usuario) {
            setUsuario(usuario)
            setcarregando(false) // caso tenha encontrado um usuario, a aplicação deve parar de carregar
        })
        return () => cancelar()
    }, [])

    async function loginGoogle(): Promise<Usuario | null> {
        // esperar a função realizar seu trabalho e retornar o usuario que pedimos
        const user = await autenticacao.loginGoogle()
        setUsuario(user)
        return user
    }

    async function logout(): Promise<void> {
        await autenticacao.logout()
        setUsuario(null)
    }

    async function atualizarUsuario(novoUsuario: Usuario) {
        if (usuario && usuario.email !== novoUsuario.email) return logout()
        if (usuario && novoUsuario && usuario.email === novoUsuario.email) {
            await servicos.usuario.salvar(novoUsuario)
            setUsuario(novoUsuario)
        }
    }

    return (
        <AutenticacaoContext.Provider value={{
            carregando,
            loginGoogle,
            atualizarUsuario,
            usuario,
            logout
        }}>
            {props.children}
        </AutenticacaoContext.Provider>
    )
}