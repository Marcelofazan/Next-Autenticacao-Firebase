import Head from 'next/head'
import Image from 'next/image'
import loadingImage from '../../../public/images/loading.gif'
import useAuth from '../../data/hook/UseAuth'
import { useRouter } from 'next/router' // Alterado para importar o hook useRouter
import { useEffect } from 'react'

export default function ForcarAutenticacao(props: any) {
    const { usuario, loading } = useAuth()
    const router = useRouter() // Inicializa o hook de rotas do Next.js

    // Movemos o redirecionamento para dentro do useEffect para rodar apenas no lado do cliente
    // e disparar estritamente quando os estados de autenticação ou rota mudarem.
    useEffect(() => {
        if (!loading && !usuario?.email && router.pathname !== '/autenticacao') {
            // Só redireciona se o cookie também sumiu (evita falsos positivos de carregamento lento)
            if (typeof window !== 'undefined' && !document.cookie.includes("dashboard-auth")) {
                router.push('/autenticacao')
            }
        }
    }, [loading, usuario, router])

    function renderizarConteudo() {
        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `if(!document.cookie.includes("dashboard-auth")){
                                window.location.href = "/autenticacao"
                            }`
                        }}
                    />
                </Head>
                {props.children}
            </>
        )
    }

    function RenderizarCarregando() {
        return (
            <div className="flex justify-center items-center h-screen">
                <Image src={loadingImage} alt="Img de carregamento" priority />
            </div>
        )
    }

    // 1. Se estiver carregando os dados do Firebase, exibe estritamente a tela de loading
    if (loading) {
        return <RenderizarCarregando />
    }

    // 2. Se o usuário estiver autenticado com sucesso, exibe o conteúdo da página
    if (usuario?.email) {
        return renderizarConteudo()
    }

    // 3. Se não tem usuário e não está carregando, renderiza nulo enquanto o useEffect redireciona
    return null
}