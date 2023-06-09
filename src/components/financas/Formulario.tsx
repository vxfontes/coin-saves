import useFormulario from "@/data/hooks/useFormulario";
import { TipoTransacao } from "@/logic/core/financas/TipoTransacao";
import Transacao from "@/logic/core/financas/Transacao";
import Dinheiro from "@/logic/utils/Dinheiro";
import { Button, Group, Radio, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCheck, IconTrash, IconX } from "@tabler/icons-react";

interface FormularioProps {
    transacao: Transacao
    salvar?: (transacao: Transacao) => void
    excluir?: (transacao: Transacao) => void
    cancelar?: () => void
}

export default function Formulario(props: FormularioProps) {
    const { alterarAtributo, dados } = useFormulario(props.transacao);

    return (
        <div className={`
            flex flex-col border border-zinc-700
            rounded-xl overflow-hidden
        `}>
            <div className="bg-black py-3 px-7 text-zinc-400">Formulário</div>
            <div className="flex flex-col gap-4 p-4 sm:p-7">
                <TextInput
                    label="Descrição"
                    value={dados.descricao}
                    onChange={alterarAtributo('descricao')}
                />
                <TextInput
                    label="Valor"
                    value={Dinheiro.formatar(dados.valor)}
                    onChange={alterarAtributo('valor', Dinheiro.desformatar)}
                />
                <DatePickerInput
                    label="Data"
                    value={dados.data}
                    locale="pt-BR"
                    valueFormat="DD/MM/YYYY"
                    onChange={alterarAtributo('data')}
                />
                <Radio.Group
                    value={dados.tipo}
                    onChange={alterarAtributo('tipo')}
                >
                    <Group>
                        <Radio value={TipoTransacao.RECEITA} label="Receita" />
                        <Radio value={TipoTransacao.DESPESA} label="Despesa" />
                        <Radio value={TipoTransacao.INVESTIMENTO} label="Investimento" />
                        <Radio value={TipoTransacao.RESERVA} label="Reserva emergencial" />
                    </Group>
                </Radio.Group>
            </div>
            <div className="flex px-1 md:px-7 py-4 gap-1 md:gap-4 bg-zinc-800">
                <Button className="bg-green-500" color="green" onClick={() => props.salvar?.(dados)}><IconCheck />Salvar</Button>
                <Button className="bg-zinc-500" color="gray" onClick={props.cancelar}><IconX />Voltar</Button>
                <span className="flex-1"></span>
                {props.transacao.id && (
                    <Button className="bg-red-500" color={'red'} onClick={() => props.excluir?.(props.transacao)}>
                        <IconTrash />Excluir
                    </Button>
                )}
            </div>
        </div>
    )
}