import Link from "next/link";
import useAuth from '../../data/hook/UseAuth'

interface AvatarUserPorps {
    className?: string
}

export default function AvatarUser(props: AvatarUserPorps) {
    const { usuario } = useAuth()
    return (
        <Link href={'/perfil'}>
            <img src={usuario?.imageUrl ?? '/images/avatar.svg'} alt="Avatar do Usuário"
                className={`h-10 w-10 rounded-full cursor-pointer ${props.className}`} />
        </Link>
    )
}