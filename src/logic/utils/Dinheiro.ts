export default class Dinheiro {
    private static _lingua = "pt-BR"
    private static _moeda = "BRL"

    /**
     * 
     * @param num recebe um numero
     * @returns retorna o valor em dinheiro formatado por localização
     */
    static formatar(num: number): string {
        return (num ?? 0).toLocaleString(Dinheiro._lingua, {
            style: "currency", currency: Dinheiro._moeda
        })
    }

    /**
     * formatação numerica
     * @param valor recebe o valor inteiro do dinheiro
     * @returns retorna apenas um valor numerico do string enviado
     */
    static desformatar(valor: string): number {
        const nums = valor.replace(/[^0-9]+/g, "")
        const i = nums.length - 2
        return Number(`${nums.substring(0, i)}.${nums.substring(i)}`)
    }
}