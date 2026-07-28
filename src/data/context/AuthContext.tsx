import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";
import Usuario from "@/model/Usuario";
import route from "next/router";
import Cookies from 'js-cookie';

interface AuthContextProps {
    usuario?: Usuario | null,
    loading?: boolean,
    login?: (email: string, senha: string) => Promise<void>
    cadastrar?: (email: string, senha: string) => Promise<void>
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        name: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token: token,
        provider: usuarioFirebase.providerData[0]?.providerId,
        imageUrl: usuarioFirebase.photoURL
    }
}

async function gerenciarCookie(logado: boolean) {
    if (logado) {
        Cookies.set('dashboard-auth', 'true', {
            expires: 7
        })
    }
    else {
        Cookies.remove('dashboard-auth')
    }
}

export function AuthProvider(props: any) {
    const [loading, setLoading] = useState(true)
    const [usuario, setUsuario] = useState<Usuario | null>(null)

    async function configurarSesssao(usuarioFirebase: any) {
        if (usuarioFirebase?.email) {
            const usuarioNormal = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuarioNormal)
            await gerenciarCookie(true)
            setLoading(false)
            return usuarioNormal.email
        }
        else {
            setUsuario(null)
            await gerenciarCookie(false)
            setLoading(false)
            return false
        }
    }

    async function login(email: any, senha: any) {
        try {
            setLoading(true)
            const resp = await firebase.auth().signInWithEmailAndPassword(email, senha)
            await configurarSesssao(resp.user)
            await route.push('/')
        } catch (error: any) {
            console.warn("Erro no login:", error.code, error.message)
            setLoading(false)
            throw error 
        }
    }

    async function cadastrar(email: any, senha: any) {
        try {
            setLoading(true)
            const resp = await firebase.auth().createUserWithEmailAndPassword(email, senha)
            await configurarSesssao(resp.user)
            await route.push('/')
        } catch (error: any) {
            console.warn("Erro no cadastro:", error.code, error.message)
            setLoading(false)
            throw error
        }
    }

    // VOLTAMOS PARA POPUP: Método mais estável para localhost no Firebase Antigo
    async function loginGoogle() {
        try {
            setLoading(true)
            const provider = new firebase.auth.GoogleAuthProvider()
            const resp = await firebase.auth().signInWithPopup(provider)
            
            // Configura a sessão com o usuário retornado pelo popup
            await configurarSesssao(resp.user)
            
            // IMPORTANTE: Deixe o roteamento acontecer aqui para o Popup fechar antes da transição
            await route.push('/')
        } catch (error) {
            console.warn("Erro no login Google:", error)
            setLoading(false)
        }
    }

    async function logout() {
        try {
            setLoading(true)
            await firebase.auth().signOut()
            await configurarSesssao(null)
            
            if (route.pathname !== '/autenticacao') {
                await route.push('/autenticacao')
            }
        } catch (error) {
            console.warn("Erro no logout:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        let cancelar = () => {}

        // Monitora o estado da sessão de forma nativa e assíncrona
        if (Cookies.get('dashboard-auth')) {
            cancelar = firebase.auth().onIdTokenChanged(configurarSesssao)
        } else {
            setLoading(false)
        }

        return () => cancelar()
    }, [])

    return (
        <AuthContext.Provider value={{
            usuario,
            loading,
            login,
            cadastrar,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext