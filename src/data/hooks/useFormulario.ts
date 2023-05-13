import { useCallback, useState } from "react"

/**
 * contexto do formulario
 * @param dadosIniciais recebe uma transação ou algum dado
 * @returns 
 */
export default function useFormulario<T = any>(dadosIniciais?: T) {
    // exportando apenas dados e setdados ja substituiremos o hook usestate
    const [dados, setDados] = useState<T>(dadosIniciais ?? {} as T)

    const alterarDados = useCallback(function (dados: T) {
        setDados(dados)
    }, [])

    /**
     * como usaremos isso em um onchange, tem que retornar uma função
     * @param atributo recebe o nome do atributo que quero modificar
     * @param fn recebe uma função, por exemplo desformatar
     * @returns função que retorna o valor da target ou evento
     */
    const alterarAtributo = useCallback(function (atributo: string, fn?: Function) {
        return (valorOuEvento: any) => {
            const v = valorOuEvento?.target?.value ?? valorOuEvento
            setDados({ ...dados, [atributo]: fn?.(v) ?? v }) // se a função existir, a chamaremos
        }
    }, [dados])

    return {
        dados,
        alterarDados,
        alterarAtributo
    }
}