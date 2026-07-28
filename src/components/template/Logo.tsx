export default function Logo() {
    return (
        <div className={`flex flex-col
            items-center justify-center    
            h-14 w-14
            bg-white
            rounded-full`
        }>
            <div className={`h-4 w-4 rounded-full bg-red-700 mb-0.5`}/>
                <div className={`flex mt-0.5`}>
                    <div className={`h-4 w-4 rounded-full bg-yellow-400 mr-0.5`}></div>
                    <div className={`h-4 w-4 rounded-full bg-green-700 ml-0.5`}></div>
                </div>
        </div>
    )
}