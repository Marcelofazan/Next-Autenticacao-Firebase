import UseAppData from "@/data/hook/UseAppData"
import BotaoAltenarTema from "./BotaoAltenarTema"
import Titulo from "./Titulo"
import AvatarUser from "./AvatarUser"

interface CabecalhoProps {
    titulo: string,
    subtitulo: string,
}

export default function Cabecalho(props: CabecalhoProps) {
    const { tema, alternarTema } = UseAppData()
    return (
        <div className={`flex`}>
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo} />
            <div className={`flex flex-grow justify-end items-end`}>
                <BotaoAltenarTema tema={tema} alternarTema={alternarTema} />
                <AvatarUser className="ml-3" />
            </div>
        </div>
    )
}