import Linha from '@/components/layout/Linha'
import Menu from '@/components/template/Menu'
import MenuItem from '@/components/template/MenuItem'
import Pagina from '@/components/template/Pagina'
import {
    IconArrowMoveDown,
    IconArrowMoveUp,
    IconArrowsDiff,
    IconClick,
    IconClock,
    IconDatabase,
    IconNumbers,
    IconRotate2,
    IconSitemap,
    IconSourceCode,
    IconTable,
} from '@tabler/icons-react'

export default function Home() {
    return (
        <Pagina>
            <Menu>
                <Linha>
                    <MenuItem
                        icone={<IconSourceCode />}
                        url="/horaAtual.html"
                        className="bg-gradient-to-r from-red-500 to-yellow-500"
                    >
                        Hora com JS (Estático)
                    </MenuItem>
                    <MenuItem
                        icone={<IconClock />}
                        url="/api/hora"
                        className="bg-gradient-to-r from-red-500 to-yellow-500"
                    >
                        Hora (Dinâmico)
                    </MenuItem>
                    <MenuItem
                        icone={<IconTable />}
                        url="/api/tabela?colunas=5&linhas=7"
                        className="bg-gradient-to-r from-red-500 to-yellow-500"
                    >
                        Tabela (Dinâmico)
                    </MenuItem>
                    <MenuItem
                        icone={<IconArrowsDiff />}
                        url="/api/usuarios"
                        className="bg-gradient-to-r from-red-500 to-yellow-500"
                    >
                        API de Usuários
                    </MenuItem>
                </Linha>
                <Linha>
                    <MenuItem
                        icone={<IconClick />}
                        url="/examples/evento"
                        className="bg-gradient-to-r from-cyan-500 to-red-500"
                    >
                        Eventos
                    </MenuItem>
                    <MenuItem
                        icone={<IconSitemap />}
                        url="/examples/filhos"
                        className="bg-gradient-to-r from-cyan-500 to-red-500"
                    >
                        Filhos
                    </MenuItem>
                    <MenuItem
                        icone={<IconArrowMoveDown />}
                        url="/examples/direta"
                        className="bg-gradient-to-r from-cyan-500 to-red-500"
                    >
                        Comunicação Direta
                    </MenuItem>
                    <MenuItem
                        icone={<IconArrowMoveUp />}
                        url="/examples/indireta"
                        className="bg-gradient-to-r from-cyan-500 to-red-500"
                    >
                        Comunicação Indireta
                    </MenuItem>
                </Linha>
                <Linha>
                    <MenuItem
                        icone={<IconNumbers />}
                        url="/examples/estado"
                        className="bg-gradient-to-r from-blue-400 to-purple-600"
                    >
                        Com Estado
                    </MenuItem>
                    <MenuItem
                        icone={<IconDatabase />}
                        url="/examples/contexto"
                        className="bg-gradient-to-r from-blue-400 to-purple-600"
                    >
                        Contexto Compartilhado
                    </MenuItem>
                    <MenuItem
                        icone={<IconRotate2 />}
                        url="/examples/promocoes"
                        className="bg-gradient-to-r from-blue-400 to-purple-600"
                    >
                        Conteúdo ServerSide
                    </MenuItem>
                </Linha>
            </Menu>
        </Pagina>
    )
}