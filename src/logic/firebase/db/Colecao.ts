import { app } from "../config/app"
import {
    collection, deleteDoc, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, getFirestore, orderBy,
    OrderByDirection, query, QueryConstraint, setDoc
} from 'firebase/firestore'

class Colecao {

    /**
     * salvar em uma colecao
     * @param caminho caminho que eu desejo armazenar
     * @param entidade objeto que desejo salvar
     * @returns retorna a entidade e o id
     */
    async salvar(caminho: string, entidade: any): Promise<any> {
        const db = getFirestore(app)
        const idFinal = entidade.id ?? crypto.randomUUID()
        const docRef = doc(db, caminho, idFinal)
        await setDoc(docRef, entidade)

        return {
            ...entidade,
            id: entidade.id ?? idFinal
        }
    }

    /**
     * 
     * @param caminho onde esta a coleção que desejo excluir um elemento baseando-se no usuario
     * @param id id do documento que queremos excluir
     * @returns true ou false para se excluiu ou não
     */
    async excluir(caminho: string, id?: string): Promise<boolean> {
        if (!id) return false
        const db = getFirestore(app)
        const docRef = doc(db, caminho, id)
        // obtendo o documento
        const itemNoBanco = await getDoc(docRef)
        if (!itemNoBanco.exists()) return false
        await deleteDoc(docRef)
        return true
    }


    /**
     * 
     * @param caminho caminho do banco de dados
     * @param ordenarPor o atributo que desejo ordenar, ex: data
     * @param direcao decrescente (desc) ou crescente(asc)
     * @returns transações de um certo usuario devidamente formatada
     */
    async consultar(caminho: string, ordenarPor?: string, direcao?: OrderByDirection): Promise<any[]> {
        // referencia do banco de dados
        const db = getFirestore(app);
        // referencia da coleção -> consultar todos os documentos de uma determinada coleção
        const colecaoRef = collection(db, caminho);
        const filtro: QueryConstraint[] = [] // filtro vazio apenas porque deve-se passar esse parametro mas n se usa
        const ordenacao = ordenarPor ? [orderBy(ordenarPor, direcao)] : [] // ordenação das transações

        // usando o caminho e a ordenação, farei uma consulta
        const consulta = query(colecaoRef, ...filtro, ...ordenacao)
        // obtendo os documentos da consulta de alguem
        const resultado = await getDocs(consulta)

        // retornando transações formatadas corretamente
        return resultado.docs.map(this._converterDoFirebase) ?? []
    }

    /**
     * quando os dados vem do firebase, especialmente as datas, vem em outro formato
     * @param snapshot dados recebidos do firebase
     * @returns se a entidade for nula, retorna o parametro e se não, retorna entidade com formato correto de data
     */
    private _converterDoFirebase(snapshot: DocumentSnapshot<DocumentData>) {
        // recebendo os dados do firebase
        const entidade: any = { ...snapshot.data(), id: snapshot.id }

        // retorno for nulo
        if (!entidade) return entidade

        // passamos por cada parte do objeto entidade e verificamos se o metodo toDate ta presente
        return Object.keys(entidade).reduce((obj: any, atributo: string) => {
            const valor: any = entidade[atributo]
            return { ...obj, [atributo]: valor.toDate?.() ?? valor }
        }, {})
    }
}

export default new Colecao()