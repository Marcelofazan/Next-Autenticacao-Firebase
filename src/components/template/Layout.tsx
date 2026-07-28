import UseAppData from "@/data/hook/UseAppData"
import Cabecalho from "./Cabecalho"
import Conteudo from "./Conteudo"
import MenuLateral from "./MenuLateral"
import ForcarAutenticacao from "../auth/ForcarAutenticacao"

interface LayoutProps {
    titulo: string,
    subtitulo: string,
    children?: any
}

export default function Layout(props: LayoutProps) {
    const { tema, alternarTema } = UseAppData()
    return (
        <ForcarAutenticacao>
            <div className={`${tema}
            flex 
            h-screen w-screen`}>
                <MenuLateral />
                <div className={`flex 
                flex-col
                bg-gray-400 dark:bg-gray-800
                w-full
                p-7`
                }>
                    <Cabecalho titulo={props.titulo} subtitulo={props.subtitulo} />
                    <Conteudo>
                        {props.children}
                    </Conteudo>
                </div>
            </div>
        </ForcarAutenticacao>
    )
}