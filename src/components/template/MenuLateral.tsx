import { AdjustmentsIcon, BellIcon, HomeIcon, LogOutIcon } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";
import useAuth from '../../data/hook/UseAuth'

export default function MenuLateral() {
    const { logout } = useAuth()
    return (
        <aside className={` flex flex-col
            bg-gray-200 text-gray-700
            dark:bg-gray-900
        `}>
            <div className={`flex flex-col
                justify-center items-center
                h-20  w-20
                bg-gradient-to-r from-indigo-500 to-purple-800
            `}>
                <Logo />
            </div>
            <ul className={`flex-grow`}>
                <MenuItem url="/" texto="Início" icone={HomeIcon} />
                <MenuItem url="/ajustes" texto="Ajustes" icone={AdjustmentsIcon} />
                <MenuItem url="/notificacoes" texto="Notificações" icone={BellIcon} />
            </ul>
            <ul>
                <MenuItem texto="Sair"
                    icone={LogOutIcon}
                    onClick={logout}
                    className={`
                        text-red-600 dark:text-red-400
                        hover:bg-red-400 hover:text-white
                        dark:hover:text-white
                    `}
                />
            </ul>
        </aside>
    )
}