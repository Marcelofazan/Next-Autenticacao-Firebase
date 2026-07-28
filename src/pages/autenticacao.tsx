import { useState } from 'react'
import AuthInput from '../components/auth/AuthInput'
import { GoogleIcon, WarningIcon } from '@/components/icons'
import useAuth from '../data/hook/UseAuth'

export default function Autenticacao() {
    const { cadastrar, login, loginGoogle } = useAuth()

    const [erro, setErro] = useState(null)
    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function exibirErro(msg: any, segundos = 5) {
        setErro(msg)
        setTimeout(() => {
            setErro(null)
        }, segundos * 1000);
    }

    async function submit() {
        try {
            if (modo === 'login') {
                await login(email, senha)
            }
            else {
                await cadastrar(email, senha)
            }
        }
        catch (error) {
            exibirErro(error?.message ?? 'Ocorreu um erro no cadastro')
        }
    }

    return (
        <div className={`flex h-screen items-center justify-center bg-gray-50`}>
            {/* Caixa do Formulário Centralizada */}
            <div className={`m-10 w-full max-w-md bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center`}>
                
                {/* Imagem posicionada em cima do título */}
                <img 
                    src="https://i.postimg.cc/rdjHDk27/user.png" 
                    alt="Imagem da tela de Autenticação"
                    className={`w-24 h-24 object-contain mb-6`}
                />

                <h1 className={`text-3xl font-bold mb-5 text-center w-full`}>
                    {modo === 'login' ? 'Entre com Sua Conta!' : 'Cadastre-se na Plataforma'}
                </h1>

                {erro ? (
                    <div className={`flex items-center w-full
                        bg-red-400 text-white
                        py-3 px-5 my-2
                        border border-red-800 rounded-lg
                    `}>
                        {WarningIcon()}
                        <span className={`ml-3`}>
                            {erro}
                        </span>
                    </div>
                ) : false}

                <div className="w-full">
                   <AuthInput label='Email' tipo='email' valor={email} obirgatorio valorMudou={setEmail} />
                    <AuthInput label='Senha' tipo='password' valor={senha} obirgatorio valorMudou={setSenha} />
                </div>

                <button onClick={submit} className={`
                w-full bg-indigo-500 hover:bg-indigo-400
                text-white rounded-lg px-4 py-3 mt-6
                `}>
                    {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                <hr className={`m-6 border-gray-300 w-full`} />

                <button onClick={loginGoogle} className={`flex items-center
                w-full bg-red-500 hover:bg-red-400
                text-white rounded-lg px-4 py-3
                `}>
                    {GoogleIcon()}
                    <span className={`flex-grow text-center`}>
                        Entrar com o Google
                    </span>
                </button>

                {modo === 'login' ? (
                    <p className={`mt-8 text-center w-full`}>
                        Novo por aqui?
                        <a onClick={() => setModo('cadastro')} className={`
                                text-blue-500 hover:text-blue-700 font-semibold cursor-pointer ml-1
                            `}>Crie uma conta gratuitamente
                        </a>
                    </p>
                ) : (
                    <p className={`mt-8 text-center w-full`}>
                        Já faz parte da comunidade?
                        <a onClick={() => setModo('login')} className={`
                                text-blue-500 hover:text-blue-700 font-semibold cursor-pointer ml-1
                            `}>Entre com suas Credenciais
                        </a>
                    </p>
                )}
            </div>
        </div>
    )
}