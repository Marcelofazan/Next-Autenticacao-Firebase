import Link from "next/link"

interface MenuItemProps {
    url?: string,
    texto: string,
    icone: any,
    onClick?: (e: any) => void,
    className?: string
}

export default function MenuItem(props: MenuItemProps) {
    function rederizarLink() {
        return (
            <div className={`flex flex-col
                justify-center items-center
                h-20 w-20 
                text-gray-600 dark:text-gray-200
                ${props.className}
            `}>
                {props.icone}
                <span className={`text-xs font-light`}>
                    {props.texto}
                </span>
            </div>
        )
    }
    return (
        <li onClick={props.onClick} className={`hover:bg-gray-100 hover:dark:bg-gray-800`}>
            {props.url ? (
                <Link href={props.url}>
                    {rederizarLink()}
                </Link>
            ) : (
                rederizarLink()
            )}

        </li>
    )
}